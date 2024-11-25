"use client"
import { useState, useEffect, useCallback } from 'react';
import { Star, Zap, Shield, Clock, Pause, Play, X } from 'lucide-react';

const AdvancedWhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [activeMoles, setActiveMoles] = useState([]);
  const [isHitting, setIsHitting] = useState(false);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [powerUp, setPowerUp] = useState(null);
  const [difficulty, setDifficulty] = useState('normal');
  const [gridSize, setGridSize] = useState(16); // 4x4 grid
  const [gameOverMessage, setGameOverMessage] = useState('');

  const difficultySettings = {
    easy: { moleInterval: 1200, moleCount: 1, timeBonus: 2 },
    normal: { moleInterval: 900, moleCount: 2, timeBonus: 1 },
    hard: { moleInterval: 600, moleCount: 3, timeBonus: 0.5 }
  };

  const powerUps = {
    timeFreeze: { icon: Clock, duration: 5000, color: 'text-blue-500' },
    doublePoints: { icon: Star, duration: 5000, color: 'text-yellow-500' },
    speedBoost: { icon: Zap, duration: 5000, color: 'text-purple-500' },
    shield: { icon: Shield, duration: 5000, color: 'text-green-500' }
  };

  const holes = Array(gridSize).fill(null);

  const startGame = (selectedDifficulty) => {
    setGameStarted(true);
    setIsPaused(false);
    setScore(0);
    setTimeLeft(60);
    setActiveMoles([]);
    setCombo(0);
    setPowerUp(null);
    setDifficulty(selectedDifficulty);
    setLevel(1);
    setGameOverMessage('');
  };

  const pauseGame = () => {
    setIsPaused(prev => !prev);
  };

  const endGame = useCallback((message = 'Game Over!') => {
    setGameStarted(false);
    setIsPaused(false);
    if (score > highScore) {
      setHighScore(score);
      setGameOverMessage(`New High Score: ${score}! 🎉`);
    } else {
      setGameOverMessage(message);
    }
  }, [score, highScore]);

  const calculatePoints = (hitTime) => {
    let points = 10;
    points += combo * 2;
    if (powerUp === 'doublePoints') points *= 2;
    const speedBonus = Math.max(0, Math.floor((1000 - hitTime) / 100));
    points += speedBonus;
    return points;
  };

  const hitMole = (index) => {
    if (isPaused) return;
    
    if (activeMoles.includes(index) && !isHitting) {
      setIsHitting(true);
      const hitTime = Date.now() % 1000;
      const points = calculatePoints(hitTime);
      
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      
      setActiveMoles(prev => prev.filter(moleIndex => moleIndex !== index));
      
      if (Math.random() < 0.1) {
        const powerUpTypes = Object.keys(powerUps);
        const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        setPowerUp(randomPowerUp);
        setTimeout(() => setPowerUp(null), powerUps[randomPowerUp].duration);
      }

      setTimeout(() => setIsHitting(false), 300);

      if (score > 0 && score % 100 === 0) {
        setLevel(prev => prev + 1);
      }

      setTimeLeft(prev => prev + difficultySettings[difficulty].timeBonus);
    } else {
      setCombo(0);
    }
  };

  useEffect(() => {
    let timeInterval;
    let moleInterval;

    if (gameStarted && !isPaused) {
      timeInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timeInterval);
            clearInterval(moleInterval);
            endGame('Time\'s up!');
            return 0;
          }
          return powerUp === 'timeFreeze' ? prev : prev - 1;
        });
      }, 1000);

      moleInterval = setInterval(() => {
        setActiveMoles(prev => {
          const maxMoles = difficultySettings[difficulty].moleCount + Math.floor(level / 3);
          if (prev.length >= maxMoles) return prev;

          const availableHoles = holes.map((_, i) => i).filter(i => !prev.includes(i));
          const newMoleIndex = availableHoles[Math.floor(Math.random() * availableHoles.length)];
          return [...prev, newMoleIndex];
        });
      }, difficultySettings[difficulty].moleInterval);
    }

    return () => {
      clearInterval(timeInterval);
      clearInterval(moleInterval);
    };
  }, [gameStarted, isPaused, difficulty, level, powerUp, endGame]);

  const PowerUpIcon = powerUp ? powerUps[powerUp].icon : null;

  return (
    <div className="text-black w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Super Whack-a-Mole!</h1>
          {gameStarted && (
            <div className="flex gap-2">
              <button
                onClick={pauseGame}
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
              >
                {isPaused ? <Play size={24} /> : <Pause size={24} />}
              </button>
              <button
                onClick={() => endGame('Game ended by player')}
                className="p-2 rounded-full hover:bg-gray-200 text-red-500"
                aria-label="End Game"
              >
                <X size={24} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-4">
          <div className="flex justify-between mb-4">
            <div className="flex flex-col items-start">
              <p className="text-lg">Score: {score}</p>
              <p className="text-sm text-gray-600">High Score: {highScore}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Level {level}</span>
              <p className="text-sm">Combo: x{combo}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-lg">Time: {timeLeft}s</p>
              {powerUp && PowerUpIcon && (
                <div className={`flex items-center ${powerUps[powerUp].color}`}>
                  <PowerUpIcon size={16} className="mr-1" />
                  <span className="text-sm">Active!</span>
                </div>
              )}
            </div>
          </div>

          {!gameStarted ? (
            <div className="flex flex-col items-center gap-4">
              {gameOverMessage && (
                <p className="text-xl font-bold text-blue-600 mb-2">{gameOverMessage}</p>
              )}
              <div className="flex justify-center gap-2">
                {Object.keys(difficultySettings).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => startGame(diff)}
                    className={`
                      px-4 py-2 rounded font-bold uppercase text-sm text-white
                      ${diff === 'easy' ? 'bg-green-500 hover:bg-green-700' : ''}
                      ${diff === 'normal' ? 'bg-blue-500 hover:bg-blue-700' : ''}
                      ${diff === 'hard' ? 'bg-red-500 hover:bg-red-700' : ''}
                    `}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          ) : isPaused ? (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-xl font-bold mb-4">Game Paused</p>
                <button
                  onClick={pauseGame}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Resume Game
                </button>
              </div>
            </div>
          ) : null}
        </div>
        
        <div className={`grid grid-cols-4 gap-2 ${isPaused ? 'pointer-events-none' : ''}`}>
          {holes.map((_, index) => (
            <div
              key={index}
              onClick={() => gameStarted && hitMole(index)}
              className={`
                h-20 rounded-full cursor-pointer transition-all duration-100
                ${activeMoles.includes(index) ? 'bg-amber-700' : 'bg-gray-300'}
                ${gameStarted && !isPaused ? 'hover:bg-gray-400' : ''}
                relative overflow-hidden
              `}
            >
              {activeMoles.includes(index) && !isPaused && (
                <div className="w-full h-full relative animate-bounce">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-amber-800 rounded-full">
                      <div className="w-3 h-3 bg-black rounded-full absolute top-3 left-3" />
                      <div className="w-3 h-3 bg-black rounded-full absolute top-3 right-3" />
                      <div className="w-6 h-3 bg-red-500 rounded-full absolute bottom-3 left-3" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedWhackAMole;