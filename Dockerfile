
FROM python:3.10-slim
WORKDIR /code
COPY app /code/app
RUN pip install fastapi uvicorn openai pdfplumber python-multipart
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
