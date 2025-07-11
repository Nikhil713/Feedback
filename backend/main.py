from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Feedback
from storage import add_feedback, get_all_feedback

app = FastAPI(title="Feedback Collector API")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/feedback")
def create_feedback(feedback: Feedback):
    add_feedback(feedback)
    return {"message": "Feedback submitted successfully."}

@app.get("/feedback")
def get_feedback():
    return get_all_feedback()
