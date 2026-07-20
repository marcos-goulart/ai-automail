from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
import pdfplumber
import traceback

# Inicializa o cliente da API do OpenAI. A chave é obtida diretamente das variáveis de ambiente do sistema.
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Instancia o servidor web do FastAPI para gerenciar a aplicação, endpoints e arquivos estáticos.
app = FastAPI()

# Configura o middleware de CORS para permitir requisições de origens cruzadas (como o Live Server na porta 5500).
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra e serve a pasta de arquivos estáticos (CSS, JS) para o navegador no endpoint '/static'.
app.mount("/static", StaticFiles(directory="app/static"), name="static")


# Rota raiz que abre e retorna o conteúdo do arquivo index.html como uma resposta HTML.
@app.get("/", response_class=HTMLResponse)
async def index():
    with open("app/templates/index.html", encoding="utf-8") as f:
        return f.read()


# Envia o e-mail coletado para o modelo gpt-4o-mini da OpenAI classificar e responder.
def classify_and_reply(text: str) -> str:
    prompt = f"""
Classifique o email abaixo como Produtivo ou Improdutivo
e gere uma resposta automática adequada em português.

Email:
{text}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content


# Endpoint assíncrono para processar o e-mail. Recebe texto digitado e/ou arquivo carregado.
@app.post("/process")
async def process_email(
    file: UploadFile = None,
    text: str = Form(None)
):
    # Valida se o usuário forneceu alguma informação (seja digitando texto ou anexando arquivo).
    if (
        (file is None or not file.filename)
        and (text is None or not text.strip())
    ):
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "error": "Preencha o campo de texto ou anexe um arquivo."
            }
        )

    try:
        content = ""

        # Caso um arquivo tenha sido anexado, lê e extrai o conteúdo do arquivo (.pdf ou .txt).
        if file and file.filename:
            # Caso seja PDF, utiliza o pdfplumber para ler todas as páginas de forma precisa.
            if file.filename.lower().endswith(".pdf"):
                with pdfplumber.open(file.file) as pdf:
                    content = "\n".join(
                        page.extract_text() or "" for page in pdf.pages
                    )
            # Caso contrário, lê o conteúdo bruto e tenta decodificar como texto UTF-8.
            else:
                content = (await file.read()).decode("utf-8", errors="ignore")

        # Se nenhum arquivo for carregado, processa diretamente o texto que o usuário digitou.
        else:
            content = text.strip()

        # Invoca a rotina da OpenAI para obter a classificação e resposta do e-mail.
        result = classify_and_reply(content)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "result": result
            }
        )

    # Captura falhas inesperadas de processamento ou autenticação na API do OpenAI e retorna um erro 500.
    except Exception:
        print(traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": "Erro interno ao processar o email"
            }
        )
