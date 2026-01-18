from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
import os
import pdfplumber
import traceback

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def index():
    with open("app/templates/index.html", encoding="utf-8") as f:
        return f.read()


def classify_and_reply(text: str) -> str:
    prompt = f"""
Classifique o email abaixo como Produtivo ou Improdutivo
e gere uma resposta automática adequada em português.

Email:
{text}
"""
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )
    return response.output_text


@app.post("/process")
async def process_email(
    file: UploadFile = None,
    text: str = Form(None)
):
    # VALIDAÇÃO ANTES DE QUALQUER PROCESSAMENTO
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

        # Usa arquivo SOMENTE se filename existir
        if file and file.filename:
            if file.filename.lower().endswith(".pdf"):
                with pdfplumber.open(file.file) as pdf:
                    content = "\n".join(
                        page.extract_text() or "" for page in pdf.pages
                    )
            else:
                content = (await file.read()).decode("utf-8", errors="ignore")

        # Caso contrário, usa texto digitado
        else:
            content = text.strip()

        result = classify_and_reply(content)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "result": result
            }
        )

    except Exception:
        print(traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": "Erro interno ao processar o email"
            }
        )
