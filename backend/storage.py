from models import Feedback

# In-memory storage
feedback_store = []

def add_feedback(feedback: Feedback):
    feedback_store.append(feedback)

    # Database Logic
    
    # db_session.add(feedback)
    # db_session.commit()

def get_all_feedback():
    return feedback_store
