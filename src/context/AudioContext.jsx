import { createContext, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [activeAudio, setActiveAudio] = useState(null);

  const toggleAudio = (audioEl) => {
    if (!audioEl) return;

    // If same audio is playing, pause it
    if (activeAudio === audioEl && !audioEl.paused) {
      audioEl.pause();
      setActiveAudio(null);
      return;
    }

    // If different audio is playing, pause it first
    if (activeAudio && activeAudio !== audioEl) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }

    // Play new audio
    audioEl.play();
    setActiveAudio(audioEl);
  };

  return (
    <AudioContext.Provider value={{ toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
