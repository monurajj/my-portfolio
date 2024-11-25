"use client"
import { useState, useEffect } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [falseBallPosition, setFalseBallPosition] = useState({ x: -10, y: -10 });
  const [powerUpPosition, setPowerUpPosition] = useState({ x: -10, y: -10 });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [ballSize, setBallSize] = useState(50);
  const [highScore, setHighScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !paused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      if (score > highScore) setHighScore(score);
    }
  }, [timeLeft, paused, score, gameStarted, highScore]);

  useEffect(() => {
    if (score % 10 === 0 && score > 0) {
      setBallSize(Math.max(20, ballSize - 5));
    }
  }, [score]);

  const moveBall = () => {
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    setPosition({ x, y });

    // Randomly move the false ball
    if (Math.random() < 0.5) {
      const falseX = Math.random() * 90;
      const falseY = Math.random() * 90;
      setFalseBallPosition({ x: falseX, y: falseY });
    }

    // Randomly show a power-up
    if (Math.random() < 0.2) {
      const powerX = Math.random() * 90;
      const powerY = Math.random() * 90;
      setPowerUpPosition({ x: powerX, y: powerY });
    }

    setScore(score + 1);
  };

  const collectPowerUp = () => {
    setScore(score + 5);
    setPowerUpPosition({ x: -10, y: -10 });
  };

  const clickFalseBall = () => {
    setScore(Math.max(0, score - 2));
    setFalseBallPosition({ x: -10, y: -10 });
  };

  const pauseGame = () => {
    setPaused(true);
  };

  const resumeGame = () => {
    setPaused(false);
  };

  const closeGame = () => {
    setGameOver(true);
    setPaused(false);
  };

  const startGame = () => {
    setShowInstructions(false);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setBallSize(50);
    setPaused(false);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 relative">
      {/* Instruction Modal */}
      {showInstructions && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 p-6">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Catch the Ball!</h1>
          <div className="text-white text-lg space-y-2 mb-6">
            <p>🟡 Click on the yellow ball to score points.</p>
            <p>🔴 Avoid the red ball! It will deduct points.</p>
            <p>🟢 Collect green power-ups for bonus points.</p>
            <p>⏱️ You have 30 seconds to score as much as possible.</p>
            <p>🎮 Use the Pause button to freeze the game if needed.</p>
          </div>
          <button
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Header */}
      <h1 className="text-4xl font-bold text-white mb-4">
        {gameOver ? "Game Over!" : paused ? "Game Paused" : "Catch the Ball"}
      </h1>
      <p className="text-2xl text-white mb-2">
        {gameOver ? `Your Score: ${score}` : `Current Score: ${score}`}
      </p>
      <p className="text-lg text-white mb-6">
        {gameOver ? "" : `Time Left: ${timeLeft}s`}
      </p>
      <p className="text-lg text-white mb-4">High Score: {highScore}</p>

      {/* Ball */}
      {!gameOver && !paused && gameStarted && (
        <div
          className="absolute bg-yellow-400 rounded-full shadow-lg transition-transform duration-200 hover:scale-125"
          style={{
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            cursor: "pointer",
          }}
          onClick={moveBall}
        ></div>
      )}

      {/* False Ball */}
      {!gameOver && !paused && gameStarted && (
        <div
          className="absolute bg-red-500 rounded-full shadow-lg transition-transform duration-200 hover:scale-125"
          style={{
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            top: `${falseBallPosition.y}vh`,
            left: `${falseBallPosition.x}vw`,
            cursor: "pointer",
          }}
          onClick={clickFalseBall}
        ></div>
      )}

      {/* Power-Up */}
      {!gameOver && !paused && gameStarted && (
        <div
          className="absolute bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shadow-md hover:scale-125 transition-transform"
          style={{
            top: `${powerUpPosition.y}vh`,
            left: `${powerUpPosition.x}vw`,
            cursor: "pointer",
          }}
          onClick={collectPowerUp}
        >
          +5
        </div>
      )}

      {/* Game Controls */}
      {paused && !gameOver && (
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform"
          onClick={resumeGame}
        >
          Resume Game
        </button>
      )}
      {!paused && !gameOver && gameStarted && (
        <button
          className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-transform"
          onClick={pauseGame}
        >
          Pause Game
        </button>
      )}
      {!gameOver && gameStarted && (
        <button
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-transform"
          onClick={closeGame}
        >
          Close Game
        </button>
      )}
      {gameOver && (
        <button
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-transform"
          onClick={startGame}
        >
          Restart Game
        </button>
      )}
    </div>
  );
}
