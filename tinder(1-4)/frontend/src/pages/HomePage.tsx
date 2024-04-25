// src/pages/HomePage.tsx

import React, { useState, useEffect, useCallback } from "react";
import CardDisplay from "../components/CardDisplay";
import "../styles/HomePage.css";

interface Profile {
  id: number;
  name: string;
  avatar: string;
  gender: string;
  location: string;
  university: string;
  interests: string;
}

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState<number>(0);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/recommendations/1"
      ); // Change the URL and user ID as needed
      if (response.ok) {
        const data = await response.json();
        setProfiles(data.recommendations);
      } else {
        console.error("Error fetching recommendations:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleSwipeLeft = useCallback(() => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentProfileIndex]);

  const handleSwipeRight = useCallback(() => {
    if (currentProfileIndex < profiles.length - 1)
      setCurrentProfileIndex((prevIndex) => prevIndex + 1);
  }, [currentProfileIndex, profiles]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handleSwipeLeft();
          break;
        case "ArrowRight":
          handleSwipeRight();
          break;
        default:
          break;
      }
    },
    [handleSwipeLeft, handleSwipeRight]
  );

  useEffect(() => {
    // Add event listener for arrow key navigation
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="App">
      <h1>Tinder Swiping</h1>
      {profiles.length > 0 ? (
        <CardDisplay
          profiles={profiles}
          currentProfileIndex={currentProfileIndex}
          handleSwipeLeft={handleSwipeLeft}
          handleSwipeRight={handleSwipeRight}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
