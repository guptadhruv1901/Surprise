import React, { useRef, useEffect } from "react";
import { data } from "../surprise/surprise";
import "./surprisePage.css";

const Home = () => {
  const videoRef = useRef();

  useEffect(() => {
    // ✅ Trigger autoplay with audio on route change
    videoRef.current?.play().catch(err => {
      console.warn("Autoplay blocked:", err.message);
    });
  }, []);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={data.video}
        controls
        loop
        playsInline
      />
    </div>
  );
};

export default Home;
