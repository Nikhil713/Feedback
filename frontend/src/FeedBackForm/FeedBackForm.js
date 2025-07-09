import { useState } from "react";
import { submitFeedback } from "../api";

export default function FeedbackForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      await submitFeedback({ text, stars });
      setText("");
      setStars(5);
      onSubmit();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        maxLength={250}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your feedback..."
        rows={4}
      />
      <div>
        <label>Rating:</label>{" "}
        <select value={stars} onChange={(e) => setStars(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
