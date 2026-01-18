---
title: Ai AutoMail
emoji: ⚡
colorFrom: purple
colorTo: gray
sdk: docker
pinned: false
---

# Ai AutoMail

Sistema de classificação automática de emails utilizando IA.

## Funcionalidades
- Upload de PDF e TXT
- Classificação: Produtivo / Improdutivo
- Resposta automática
- Interface moderna animada
- Splash screen
- Backend em Python (FastAPI)
- Integração com OpenAI

## Execução local

1. Configure a variável:
OPENAI_API_KEY=suachave

2. Build:
docker build -t ai-automail .

3. Run:
docker run -p 7860:7860 ai-automail

Acesse: http://localhost:7860

## Deploy
Compatível com Hugging Face Spaces (Docker).
