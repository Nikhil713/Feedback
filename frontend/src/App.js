import FeedbackForm from "./FeedBackForm/FeedBackForm";
import FeedbackList from "./FeedBackForm/FeedBackList";
import "./App.css";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>Feedback Collector</h1>
      <FeedbackForm onSubmit={handleSubmit} />
      <FeedbackList key={refresh} />
    </div>
  );
}

export default App;
