from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Feedback

app = FastAPI(title="Feedback Collector API")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend origin in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
feedback_store = []

@app.post("/feedback")
def create_feedback(feedback: Feedback):
    feedback_store.append(feedback)
    return {"message": "Feedback submitted successfully."}

@app.get("/feedback")
def get_feedback():
    return feedback_store
