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
- ⚡ **Classificação Inteligente**: Classifica e-mails em **Produtivo** ou **Improdutivo** utilizando modelos de linguagem avançados (`gpt-4o-mini`).
- ✍️ **Resposta Automática**: Gera uma resposta automática profissional adequada em português.
- 📋 **Cópia Rápida**: Copia a resposta gerada para a área de transferência com um clique.
- 🎨 **Interface Premium**: Design com tema escuro (dark purple), animações de entrada, tela de carregamento (splash screen), feedbacks visuais animados para carregamento e controle de erros.

---

## 🛠️ Tecnologias Utilizadas

* **Backend**: Python, [FastAPI](https://fastapi.tiangolo.com/), Uvicorn.
* **Leitura de Arquivos**: [pdfplumber](https://github.com/jsvine/pdfplumber) para extração precisa de texto em PDFs.
* **Frontend**: HTML5 (Semântico), CSS3 customizado (com animações e blur dinâmico) e Vanilla JavaScript.
* **IA**: SDK Oficial da [OpenAI](https://github.com/openai/openai-python).

---

## 🔑 Como Obter a Chave de API da OpenAI (`OPENAI_API_KEY`)

Para utilizar o sistema, é necessário ter uma chave de acesso da OpenAI. Siga o passo a passo abaixo para criar a sua:

1. **Acesse a plataforma**: Vá para o site oficial [OpenAI Platform](https://platform.openai.com/).
2. **Crie uma Conta ou Faça Login**: Registre-se na plataforma ou faça o login com sua conta existente.
3. **Configure o Faturamento (Billing)**:
   - No menu lateral esquerdo, vá em **Settings** > **Billing**.
   - Adicione créditos à sua conta (um valor mínimo de $5 USD é suficiente para realizar milhares de requisições utilizando o modelo econômico `gpt-4o-mini`).
   - *Nota: Contas novas às vezes ganham um saldo gratuito temporário, mas chaves sem saldo/faturamento ativo retornarão erro de quota excedida (MIME/API 429 ou 400).*
4. **Gere a sua API Key**:
   - No menu lateral esquerdo, clique em **API Keys**.
   - Clique no botão **+ Create new secret key**.
   - Dê um nome para identificar a sua chave (exemplo: `AI-AutoMail`) e clique em **Create secret key**.
   - **Copie a chave gerada imediatamente!** Ela começa com `sk-...`. Por motivos de segurança, você não poderá visualizá-la novamente após fechar a janela. Guarde-a em um local seguro.

---

## 🚀 Como Executar o Projeto Localmente

### Método 1: Executando Diretamente com Python (Recomendado para Desenvolvimento)

#### 1. Clonar o Repositório
Abra o seu terminal e execute o comando abaixo para clonar o repositório:
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
Com o ambiente ativado, instale as bibliotecas necessárias:
```bash
pip install -r requirements.txt
```

#### 4. Configurar a Chave da API
Defina a variável de ambiente com a chave da OpenAI que você copiou no passo anterior.

No Windows (PowerShell):
```powershell
$env:OPENAI_API_KEY="sua_chave_aqui_sk-..."
```
No Windows (Prompt de Comando - CMD):
```cmd
set OPENAI_API_KEY=sua_chave_aqui_sk-...
```
No Linux/macOS:
```bash
export OPENAI_API_KEY="sua_chave_aqui_sk-..."
```

#### 5. Executar o Servidor FastAPI
Execute a aplicação localmente utilizando o Uvicorn:
```bash
uvicorn app.main:app --reload
```
Acesse a aplicação no seu navegador no endereço: **`http://localhost:8000`**

---

### Método 2: Executando com Docker

Se você possui o [Docker](https://www.docker.com/) instalado em sua máquina, pode rodar o sistema de forma isolada em um container.

#### 1. Clonar o Repositório e Entrar na Pasta
```bash
git clone https://github.com/marcos-goulart/ai-automail.git
cd ai-automail
```

#### 2. Construir a Imagem Docker
```bash
docker build -t ai-automail .
```

#### 3. Executar o Container Docker
Substitua `"sua_chave_aqui_sk-..."` pela sua chave gerada da OpenAI:
```bash
docker run -d -p 7860:7860 -e OPENAI_API_KEY="sua_chave_aqui_sk-..." ai-automail
```

Acesse a aplicação no seu navegador no endereço: **`http://localhost:7860`**

---

## ☁️ Deploy no Hugging Face Spaces

Este projeto foi configurado com suporte direto ao **Hugging Face Spaces** utilizando Docker.

Para realizar o deploy:
1. Crie um novo Space no Hugging Face.
2. Selecione a opção **Docker** como SDK.
3. Suba os arquivos do repositório para o Space.
4. Defina o segredo de ambiente `OPENAI_API_KEY` nas configurações do Space (**Settings** > **Variables and Secrets**) para que a aplicação consiga fazer as requisições à OpenAI com segurança.
