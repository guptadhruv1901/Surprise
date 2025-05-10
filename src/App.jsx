import React, { useRef, useState } from "react";
import DraggableCard from "./DraggableCard.jsx";
import surprise from "./surprise/surprise.js";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./surprisePage/nextpage.jsx";

const generateScatteredHeartPoints = (n, scale = 12, scatter = 25) => {
  const points = [];
  for (let i = 0; i < n; i++) {
    const t = (Math.PI * 2 * i) / n;
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y =
      -scale *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));

    const jitterX = x + (Math.random() - 0.5) * scatter;
    const jitterY = y + (Math.random() - 0.5) * scatter;

    points.push({ x: jitterX, y: jitterY });
  }
  return points;
};

function App() {
  const containerRef = useRef(null);
  const [topZ, setTopZ] = useState(10);
  const heartPoints = generateScatteredHeartPoints(surprise.length);
  const navigate = useNavigate();

  const goToSurprise = () => {
    navigate("/surprise"); // ✅ Triggers routing as a user action
  };

  return (
    <div className="fullscreen-container" ref={containerRef}>
      <h2 className="main-heading">❤️✨ Happy Birthday Meri Jaan ✨❤️</h2>

      <button className="surprise-btn" onClick={goToSurprise}>
        Here is a Surprise for you Jaan
      </button>

      {surprise.map((item, index) => (
        <DraggableCard
          key={index}
          imgSrc={item.image}
          btnLabel="Play"
          text={item.message}
          dragAreaRef={containerRef}
          setTopZ={setTopZ}
          topZ={topZ}
          musicSrc={item.music}
          initialX={heartPoints[index].x}
          initialY={heartPoints[index].y}
        />
      ))}

      <Routes>
        <Route path="/surprise" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
