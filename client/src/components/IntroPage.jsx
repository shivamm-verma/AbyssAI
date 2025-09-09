import React from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <h1 className="logo">AbyssAI</h1>
      <p className="tagline">Revolutionizing Data with Visualization</p>
      <button className="start-btn" onClick={() => navigate("/home")}>
        Let’s Start →
      </button>
    </div>
  );
}