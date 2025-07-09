import { useState } from "react";
import { submitFeedback } from "../api";
import "./FeedBackForm.css";

export default function FeedbackForm({ onSubmit }) {
    const [text, setText] = useState("");
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
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
            <div className="left-top-box">
                <div className="share-your-exp-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send w-6 h-6 text-gray-600" data-lov-id="src/components/FeedbackForm.tsx:55:12" data-lov-name="Send" data-component-path="src/components/FeedbackForm.tsx" data-component-line="55" data-component-file="FeedbackForm.tsx" data-component-name="Send" data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-gray-600%22%7D"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
                    Share Your Experience
                </div>
                <div className="share-your-exp-2">Your feedback helps us maintain our commitment to excellence</div>
            </div>
            <div className="left-middle-box">
                <div className="star-rating-title">
                    Rate Your Experience
                </div>
                <div
                    className="star-rating"
                    onMouseLeave={() => setHover(0)}
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <svg
                            key={n}
                            onMouseEnter={() => setHover(n)}
                            onClick={() => setStars(n)}
                            className={`star-svg ${n <= (hover || stars) ? "filled" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="32"
                            height="32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77
                5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                fill={n <= (hover || stars) ? "#FFD700" : "none"}
                                stroke={n <= (hover || stars) ? "#FFD700" : "#ccc"}
                            />
                        </svg>
                    ))}
                </div>
            </div>
            <div className="left-bottom-box">
                <div className="star-rating-title feedback-title">
                    Your Feedback
                </div>
                <div className="feedback-textarea">
                    <textarea
                        maxLength={250}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Please share your experience with Mercedes-Benz. Your detailed feedback helps us improve our services."
                        rows={4}
                    />
                </div>
                <div className="feedback-submit">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send w-6 h-6 text-gray-600" data-lov-id="src/components/FeedbackForm.tsx:55:12" data-lov-name="Send" data-component-path="src/components/FeedbackForm.tsx" data-component-line="55" data-component-file="FeedbackForm.tsx" data-component-name="Send" data-component-content="%7B%22className%22%3A%22w-6%20h-6%20text-gray-600%22%7D"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
                        Submit Feedback
                    </button>
                </div>
            </div>

        </form>
    );
}
