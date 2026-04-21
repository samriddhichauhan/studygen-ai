from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import requests
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "StudyGen Backend Running 🚀"}


def call_ollama(prompt):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi",
                "prompt": prompt,
                "stream": False
            }
        )
        return response.json().get("response", "No response")
    except Exception as e:
        return f"Ollama error: {str(e)}"


def generate_summary(text):
    prompt = f"Summarize this in simple bullet points:\n{text[:800]}"
    return call_ollama(prompt)


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(".pdf"):
            return {"error": "Only PDF files allowed"}

        file_location = f"temp_{file.filename}"

        with open(file_location, "wb") as f:
            f.write(await file.read())

        reader = PdfReader(file_location)
        text = ""

        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"

        os.remove(file_location)

        summary = generate_summary(text)

        return {
            "filename": file.filename,
            "extracted_text": text[:2000],
            "summary": summary
        }

    except Exception as e:
        return {"error": str(e)}