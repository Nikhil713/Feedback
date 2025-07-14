# Feedback Collector MVP

A full-stack web application for collecting and displaying user feedback in real time. Built with **FastAPI** - backend and **React** - frontend, and deployed on **Azure Web App for Linux**.

## 🚀 Features

- Submit feedback with a star rating and comment.
- View all feedback submissions live.
- Admin functionality to clear feedback.
- RESTful API with interactive Swagger documentation.
- FastAPI backend served together with the React frontend.
- Azure-compatible architecture (Python 3.11, Linux Web App).

## 🧪 Running Locally

### 1. Clone the repository and install requirements.txt
```
git clone https://github.com/your-username/feedback-collector.git
cd feedback-collector
pip install -r requirements.txt
```

### 2. Start Backend (FastAPI)

```
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Access Swagger docs at: http://localhost:8000/docs

<img width="1853" height="899" alt="image" src="https://github.com/user-attachments/assets/e0f50be7-3eca-4aba-a30e-1f964b35b308" />

### 3. Start Frontend (React)

```
cd frontend
npm install
npm start
```
View the app at  http://localhost:8000
						
<img width="2394" height="1139" alt="image" src="https://github.com/user-attachments/assets/5c444bed-1f2e-45ae-b3b9-8c1ba848ffe1" />
## 🌐 Azure Deployment
You can view the deployed application at https://feedback-portal-nikhil.azurewebsites.net/


