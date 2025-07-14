from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from models import Feedback
from storage import add_feedback, get_all_feedback, clear_all_feedback
import os

app = FastAPI(title="Feedback Collector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
#        API Routes
# ---------------------------

@app.post("/feedback")
def create_feedback(feedback: Feedback):
    add_feedback(feedback)
    return {"message": "Feedback submitted successfully."}

@app.get("/feedback")
def get_feedback():
    return get_all_feedback()

@app.delete("/admin/clear-feedback")
def clear_feedback():
    clear_all_feedback()
    return {"message": "All feedbacks cleared."}

# ---------------------------
#   Serve React Frontend
# ---------------------------

# Serve React static files (CSS, JS, etc.)
app.mount("/static", StaticFiles(directory="../frontend/build/static"), name="static")

# Catch-all route: serves React index.html for any path
@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    index_path = os.path.abspath("../frontend/build/index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "React frontend not found. Please build it."}
