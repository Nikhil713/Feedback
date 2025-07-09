from pydantic import BaseModel, Field
from datetime import datetime

class Feedback(BaseModel):
    text: str = Field(..., max_length=250)
    stars: int = Field(..., ge=1, le=5)
    timestamp: datetime = Field(default_factory=datetime.now)
