import { useEffect, useState } from "react";
import { fetchFeedback } from "../api";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetchFeedback();
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, f) => sum + f.stars, 0) / feedbacks.length
        ).toFixed(1)
      : null;

  return (
    <div>
      {averageRating && (
        <p className="average-rating">
          Average Rating: {averageRating} / 5
        </p>
      )}
      <ul className="feedback-list">
        {feedbacks.map((fb, index) => (
          <li key={index} className="feedback-item">
            <p><strong>Date:</strong> {new Date(fb.timestamp).toLocaleString()}</p>
            <p><strong>Rating:</strong> {fb.stars} Star{fb.stars > 1 ? "s" : ""}</p>
            <p>{fb.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
