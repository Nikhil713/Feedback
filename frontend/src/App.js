import FeedbackForm from "./FeedBackForm/FeedBackForm";
import FeedbackList from "./FeedBackForm/FeedBackList";
import "./App.css";
import { useState } from "react";
import logo from './assets/Mercedes-Logo.png';


function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Mercedes-Benz Logo" className="logo" />
          <span className="company-name">Mercedes-Benz</span>
        </div>
      </header>

      <div className="container">
        <h1>Feedback Collector</h1>
        <FeedbackForm onSubmit={handleSubmit} />
        <FeedbackList key={refresh} />
      </div>
    </>
  );
}

export default App;
