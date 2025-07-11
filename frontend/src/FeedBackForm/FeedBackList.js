import { useEffect, useState, useRef } from "react";
import { fetchFeedback } from "../api";
import "./FeedbackList.css";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const average =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.stars, 0) / feedbacks.length
      : 0;


  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Export functions
  const exportJSON = () => {
    const dataStr = JSON.stringify(feedbacks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback.json";
    a.click();

    URL.revokeObjectURL(url);
    setDropdownOpen(false);
  };

  const exportCSV = () => {
    const headers = ["Timestamp", "Stars", "Text"];
    const rows = feedbacks.map((fb) => [
      new Date(fb.timestamp).toLocaleString(),
      fb.stars,
      `"${fb.text.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback.csv";
    a.click();

    URL.revokeObjectURL(url);
    setDropdownOpen(false);
  };

  return (
    <div className="right">
      <div className="avg-box">
        <div className="avg-box-heading">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-5 h-5 text-gray-600" data-lov-id="src/components/FeedbackDisplay.tsx:40:12" data-lov-name="TrendingUp" data-component-path="src/components/FeedbackDisplay.tsx" data-component-line="40" data-component-file="FeedbackDisplay.tsx" data-component-name="TrendingUp" data-component-content="%7B%22className%22%3A%22w-5%20h-5%20text-gray-600%22%7D"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          <h2>Employee Satisfaction</h2></div>

        <div className="avg-box-text">
          <div className="avg-box-rating">{average.toFixed(1)}</div> <br />
          <div className="stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <svg
                key={n}
                className="star-svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77
                  5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill={n <= Math.round(average) ? "#FFD700" : "#ccc"}
                />
              </svg>
            ))}
          </div>
          <div className="avg-box-rating-text">
            Based on {feedbacks.length} {feedbacks.length === 1 ? "review" : "reviews"}
          </div>
        </div>
      </div>

      <div className="feedbacks-container">
        {feedbacks.length > 0 && (
          <div className="all-feedbacks">
            <div
              className="all-feedbacks-heading"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square w-5 h-5 text-gray-600"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3>Recent Feedback</h3>
              </div>

              <div
                className="export-dropdown"
                style={{ position: "relative" }}
                ref={dropdownRef}
              >
                <button
                  className="export-btn"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download w-4 h-4" data-lov-id="src/components/FeedbackDisplay.tsx:122:20" data-lov-name="Download" data-component-path="src/components/FeedbackDisplay.tsx" data-component-line="122" data-component-file="FeedbackDisplay.tsx" data-component-name="Download" data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                  Export
                </button>

                {dropdownOpen && (
                  <div
                    className="dropdown-menu"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      zIndex: 1000,
                      minWidth: "140px",
                    }}
                  >
                    <button
                      className="dropdown-item"
                      onClick={exportJSON}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database w-4 h-4" data-lov-id="src/components/FeedbackDisplay.tsx:128:20" data-lov-name="Database" data-component-path="src/components/FeedbackDisplay.tsx" data-component-line="128" data-component-file="FeedbackDisplay.tsx" data-component-name="Database" data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
                      Export as JSON
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={exportCSV}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-4 h-4" data-lov-id="src/components/FeedbackDisplay.tsx:132:20" data-lov-name="FileText" data-component-path="src/components/FeedbackDisplay.tsx" data-component-line="132" data-component-file="FeedbackDisplay.tsx" data-component-name="FileText" data-component-content="%7B%22className%22%3A%22w-4%20h-4%22%7D"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                      Export as CSV
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="all-feedbacks-body">
              <ul className="feedback-list">
                {feedbacks
                  .slice()
                  .reverse()
                  .map((fb, index) => (
                    <li key={index} className="feedback-item">
                      <div className="feedback-item-header">
                        <div className={`rating-icon rating-${fb.stars}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-star w-3 h-3"
                          >
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                          </svg>
                          <p>{fb.stars}</p>
                        </div>
                        <div className="rating-icon-date">
                          <p>
                            {new Date(fb.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="feedback-item-text">
                        <p>{fb.text}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
