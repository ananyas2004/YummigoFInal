
import React, { useState } from 'react';
import './Spinwheel.css';

const SpinWheel = ({ options }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState("");

  const spinWheel = () => {
    if (isSpinning) return; // Prevent multiple spins

    const randomDegree = Math.floor(Math.random() * 360) + 1440; // Add multiple rotations
    const segmentAngle = 360 / options.length; // Calculate the angle of each segment

    setIsSpinning(true);
    setPrize("");

    // Animate the wheel
    const wheel = document.getElementById('wheel');
    if (!wheel) {
      console.error("Wheel element not found!");
      return;
    }

    wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Set the prize after the spin animation completes
    setTimeout(() => {
      const normalizedDegree = randomDegree % 360; // Get the final degree after stopping
      const winningIndex = Math.floor(
        (options.length - normalizedDegree / segmentAngle) % options.length
      ); // Calculate winning index
      const selectedPrize = options[winningIndex+1];

      setIsSpinning(false);
      setPrize(selectedPrize);
    }, 4000);
  };

  return (
    <div className="spinwheel-container" id="spin-wheel">
        <div id="decide"><h1>Discover Your Food Mood!</h1></div>
      <div className="wheel-wrapper">
        <div id="wheel" className="spinwheel">
          {options.map((option, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${(360 / options.length) * index}deg)`,
                backgroundColor: index % 2 === 0 ? '#8E1C62' : '#B94A74', // Berry color tones
              }}
            >
              <span
                style={{
                  transform: `rotate(${-(360 / options.length) * index}deg)`,
                }}
              >
                {option}
              </span>
            </div>
          ))}
        </div>
        <div className="arrow"></div>
      </div>
      <button
        className={`spin-button ${isSpinning ? 'disabled' : ''}`}
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>
      {prize && (
        <div className="result">
          🎉 Feeling indecisive? The wheel says: <strong>{prize}</strong> 🎉
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
