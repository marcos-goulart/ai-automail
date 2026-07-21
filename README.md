---
title: Ai AutoMail
emoji: ⚡
colorFrom: purple
colorTo: gray
sdk: docker
pinned: false
---

# ⚡ AI AutoMail

O **AI AutoMail** é um sistema inteligente de classificação automática e resposta de e-mails utilizando a API da OpenAI. Com uma interface web moderna, interativa e responsiva, ele permite analisar textos digitados ou arquivos anexados (formatos `.txt` e `.pdf`).

---

## ✨ Funcionalidades

- 📁 **Upload de Arquivos**: Suporta leitura automática de arquivos de texto simples (`.txt`) e documentos PDF (`.pdf`).
- 🖱️ **Drag and Drop**: Permite arrastar e soltar arquivos diretamente na tela para análise.
- ⚡ **Classificação Inteligente**: Classifica e-mails em **Produtivo** ou **Improdutivo** utilizando modelos de linguagem avançados.
- ✍️ **Resposta Automática**: Gera uma resposta automática profissional adequada em português.
- 📋 **Cópia Rápida**: Copia a resposta gerada para a área de transferência com um clique.
- 🎨 **Interface Premium**: Design com tema escuro (dark purple), animações de entrada, tela de carregamento (splash screen), feedbacks visuais animados para carregamento e controle de erros.

---

## 🛠️ Tecnologias Utilizadas

* **Backend**: Python, [FastAPI](https://fastapi.tiangolo.com/), Uvicorn.
* **Leitura de Arquivos**: [pdfplumber](https://github.com/jsvine/pdfplumber) para extração precisa de texto em PDFs.
* **Frontend**: HTML5 (Semântico), CSS3 customizado (com animações e blur dinâmico) e Vanilla JavaScript.
* **IA**: SDK Oficial da [OpenRouter]([https://github.com/openai/openai-python](https://openrouter.ai/)).

---

## 🔑 Configuração da API de IA

Este projeto é compatível com qualquer provedor que utilize o padrão da API da OpenAI. Isso permite utilizar diferentes modelos e serviços de IA apenas alterando as variáveis de ambiente, sem necessidade de modificar o código.

## 🔌 Provedores Compatíveis

Este projeto foi desenvolvido utilizando o SDK oficial da OpenAI, mas é compatível com qualquer provedor que implemente a API padrão da OpenAI. Isso permite alternar entre diferentes serviços apenas modificando as variáveis de ambiente, sem necessidade de alterar o código-fonte.

| Provedor | Compatível | Observações |
|----------|:----------:|-------------|
| 🤖 OpenAI | ✅ | API oficial da OpenAI. |
| ⚡ Groq | ✅ | Excelente desempenho e plano gratuito para desenvolvimento. |
| 🌐 OpenRouter | ✅ | Acesso a diversos modelos open source e comerciais através de uma única API. |
| 🤝 Together AI | ✅ | Plataforma com diversos modelos open source compatíveis. |
| 🔥 Fireworks AI | ✅ | Serviço otimizado para inferência de modelos de linguagem. |
| 🧠 DeepInfra | ✅ | Disponibiliza diversos modelos open source através de API compatível. |

### Exemplo de Configuração

Cada provedor possui seu próprio processo para geração da chave de API. Consulte a documentação oficial do serviço escolhido para obter sua chave de acesso.

As variáveis de ambiente utilizadas pelo projeto são:

| Variável | Descrição |
|----------|-----------|
| `API_KEY` | Chave de acesso do provedor de IA escolhido. |
| `BASE_URL` | URL base da API do provedor. |
| `MODEL` | Modelo de IA que será utilizado pela aplicação. |

### Exemplo utilizando OpenAI

| Variável | Valor |
|----------|-------|
| `API_KEY` | `sk-...` |
| `BASE_URL` | `https://api.openai.com/v1` |
| `MODEL` | `gpt-4o-mini` |

### Exemplo utilizando Groq

| Variável | Valor |
|----------|-------|
| `API_KEY` | `gsk_...` |
| `BASE_URL` | `https://api.groq.com/openai/v1` |
| `MODEL` | `llama-3.3-70b-versatile` |

### Exemplo utilizando OpenRouter

| Variável | Valor |
|----------|-------|
| `API_KEY` | `sk-or-v1-...` |
| `BASE_URL` | `https://openrouter.ai/api/v1` |
| `MODEL` | `deepseek/deepseek-r1-0528:free` |

---

## 🚀 Como Executar o Projeto Localmente

### Método 1: Executando Diretamente com Python (Recomendado para Desenvolvimento)

#### 1. Clonar o Repositório

Abra o seu terminal e execute:

```bash
git clone https://github.com/marcos-goulart/ai-automail.git
cd ai-automail
```

#### 2. Criar e Ativar um Ambiente Virtual (Opcional, mas recomendado)

No Windows (PowerShell):

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

No Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Instalar as Dependências

```bash
pip install -r requirements.txt
```

#### 4. Configurar as Variáveis de Ambiente

Substitua os valores abaixo pelas configurações do provedor de IA escolhido.

**Windows (PowerShell)**

```powershell
$env:API_KEY="sua_chave"
$env:BASE_URL="https://api.openai.com/v1"
$env:MODEL="gpt-4o-mini"
```

**Windows (CMD)**

```cmd
set API_KEY=sua_chave
set BASE_URL=https://api.openai.com/v1
set MODEL=gpt-4o-mini
```

**Linux/macOS**

```bash
export API_KEY="sua_chave"
export BASE_URL="https://api.openai.com/v1"
export MODEL="gpt-4o-mini"
```

> Basta alterar os valores de `BASE_URL` e `MODEL` para utilizar outro provedor compatível, como Groq ou OpenRouter.

#### 5. Executar o Servidor FastAPI

```bash
uvicorn app.main:app --reload
```

Acesse a aplicação em:

**`http://localhost:8000`**

---

### Método 2: Executando com Docker

#### 1. Clonar o Repositório

```bash
git clone https://github.com/marcos-goulart/ai-automail.git
cd ai-automail
```

#### 2. Construir a Imagem Docker

```bash
docker build -t ai-automail .
```

#### 3. Executar o Container

```bash
docker run -d -p 7860:7860 \
-e API_KEY="sua_chave" \
-e BASE_URL="https://api.openai.com/v1" \
-e MODEL="gpt-4o-mini" \
ai-automail
```

Acesse:

**`http://localhost:7860`**

---

## ☁️ Deploy no Hugging Face Spaces

Este projeto possui suporte nativo ao **Hugging Face Spaces** utilizando Docker.

Para realizar o deploy:

1. Crie um novo **Space** no Hugging Face.
2. Selecione **Docker** como SDK.
3. Faça o upload ou conecte o repositório GitHub ao Space.
4. Em **Settings → Variables and Secrets**, crie as seguintes variáveis de ambiente:

| Variável | Descrição |
|----------|-----------|
| `API_KEY` | Chave do provedor de IA escolhido. |
| `BASE_URL` | URL base da API do provedor. |
| `MODEL` | Modelo que será utilizado pela aplicação. |

Após configurar essas variáveis, o Space estará pronto para utilizar qualquer provedor compatível com a API da OpenAI, bastando alterar seus respectivos valores.
