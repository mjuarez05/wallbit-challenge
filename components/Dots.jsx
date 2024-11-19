import React from 'react'
import "../src/App.css"

import { useState, useEffect } from 'react'

const Dots = ({count = 100}) => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generaDots = () => {
      const newDots = Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100, 
        left: Math.random() * 100,
        width: 3, 
        height: 3, 
        speed: Math.random() * 50 + 4,
      }));
      setDots(newDots);
    };

    generaDots();
  }, [count]);

  return (
    <div className="dots-container">
      {dots.map((i) => (
        <div
          key={i.id}
          className="dots"
          style={{
            top: `${i.top}%`,
            left: `${i.left}%`,
            width: `${i.width}px`,
            height: `${i.height}px`,
            animationDuration: `${i.speed}s`,
          }}
        />
      ))}
    </div>
  );
  };

export default Dots