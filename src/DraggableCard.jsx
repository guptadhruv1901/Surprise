import React, { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { AudioContext } from "./context/AudioContext.jsx";
import "./App.css";

// Random pink shade
const getRandomPink = () => {
  const pinkShades = [
    "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493",
    "#DB7093", "#FF85A2", "#FDAEAE", "#FF99CC"
  ];
  return pinkShades[Math.floor(Math.random() * pinkShades.length)];
};

const DraggableCard = ({
  imgSrc,
  btnLabel,
  text,
  dragAreaRef,
  setTopZ,
  topZ,
  musicSrc,
  initialX,
  initialY,
}) => {
  const [isImageVisible, setImageVisible] = useState(true);
  const [zIndex, setZIndex] = useState(1);
  const [isDropped, setIsDropped] = useState(false);
  const [initialColor] = useState(getRandomPink());
  const audioRef = useRef(null);

  const { toggleAudio } = useContext(AudioContext);

  const handleDoubleClick = () => setImageVisible(false);

  const handleDragStart = () => {
    const newTop = topZ + 1;
    setTopZ(newTop);
    setZIndex(newTop);
  };

  const handleDragEnd = () => {
    setIsDropped(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current?.src) return;
    toggleAudio(audioRef.current);
  };

  return (
    <motion.div
      className="card"
      drag
      dragConstraints={dragAreaRef}
      dragElastic={0.6}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ x: initialX, y: initialY, scale: 0.6 }}
      animate={{
        scale: isDropped ? 1 : 0.6,
        backgroundColor: isDropped ? "#ffffff" : initialColor,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        zIndex,
        position: "absolute",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        borderRadius: "1rem",
        padding: "1rem",
        width: "260px",
        top: "30%",
        textAlign: "center",
      }}
    >
      <div className="card-img-container" onDoubleClick={handleDoubleClick}>
        <motion.img
          src={imgSrc}
          alt="Card"
          className="card-img"
          style={{ width: "100%", borderRadius: "0.75rem" }}
          animate={{ opacity: isImageVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        {!isImageVisible && (
          <motion.div
            className="card-text"
            style={{
              width: "100%",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.div>
        )}
      </div>

      <button className="card-btn" onClick={toggleMusic} style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "none",
        background: "#ff1493",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
      }}>
        {btnLabel}
      </button>

      <audio ref={audioRef} src={musicSrc} hidden />
    </motion.div>
  );
};

export default DraggableCard;
