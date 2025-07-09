import FeedbackForm from "./FeedBackForm/FeedBackForm";
import FeedbackList from "./FeedBackForm/FeedBackList";
import "./App.css";
import { useState } from "react";
import logo from "./assets/Mercedes-Logo.png";


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

      <main className="main-content">
        <div className="left-side-space">
          <div className="left-side">
            <FeedbackForm
              onSubmit={(data) => {
                console.log("Feedback submitted", data);
                handleSubmit();
              }}
            />
          </div>
        </div>
        <div className="right-side-space">
          <div className="right-side">
            <FeedbackList key={refresh} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
