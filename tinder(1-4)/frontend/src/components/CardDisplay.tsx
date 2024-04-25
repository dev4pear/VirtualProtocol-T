// src/components/CardDisplay.tsx

import React, { useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";

interface Profile {
  id: number;
  name: string;
  avatar: string;
  gender: string;
  location: string;
  university: string;
  interests: string;
}

interface Props {
  profiles: Profile[];
  currentProfileIndex: number;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
}

const CardDisplay: React.FC<Props> = ({
  profiles,
  currentProfileIndex,
  handleSwipeLeft,
  handleSwipeRight,
}) => {
  const [initialX, setInitialX] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  const handleDragStart = () => {
    setInitialX(window.innerWidth / 2); // Set initial X position to center of the screen
  };

  const handleDragWhile = (event: DraggableEvent) => {
    if ("screenX" in event) {
      const deltaX = event.screenX - initialX;
      const maxRotation = 50;
      const rotationFactor = 0.1; // Adjust this value to control rotation sensitivity
      const newRotationAngle = Math.min(
        Math.max(-maxRotation, deltaX * rotationFactor),
        maxRotation
      );
      setRotationAngle(newRotationAngle);
    }
  };

  const handleDragStop = () => {
    if (rotationAngle > 5) handleSwipeRight();
    else if (rotationAngle < -5) handleSwipeLeft();
    setRotationAngle(0);
  };

  return (
    <Draggable
      axis="both"
      position={{ x: 0, y: 0 }}
      onStart={handleDragStart}
      onDrag={handleDragWhile}
      onStop={handleDragStop}
    >
      <div className="card">
        <div style={{ transform: `rotate(${rotationAngle}deg)` }}>
          <h2>{profiles[currentProfileIndex].name}</h2>
          <img src={profiles[currentProfileIndex].avatar} />
          <p>Gender: {profiles[currentProfileIndex].gender}</p>
          <p>Location: {profiles[currentProfileIndex].location}</p>
          <p>University: {profiles[currentProfileIndex].university}</p>
          <p>Interests: {profiles[currentProfileIndex].interests}</p>
          <div className="buttons">
            <button onClick={handleSwipeLeft}>Swipe Left</button>
            <button onClick={handleSwipeRight}>Swipe Right</button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default CardDisplay;
