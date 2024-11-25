"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Heart, Star, AlertTriangle } from 'lucide-react';
// import { Alert } from "@/components/ui/alert";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const SpaceBurgerGame = () => {
  const [playerPosition, setPlayerPosition] = useState(GAME_WIDTH / 2);
  const [ingredients, setIngredients] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [specialObstacles, setSpecialObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(5);
  const [showLevelAlert, setShowLevelAlert] = useState(false);
  const [levelMessage, setLevelMessage] = useState('');

  const ingredientTypes = [
    { type: 'patty', points: 10, color: 'bg-amber-700' },
    { type: 'cheese', points: 5, color: 'bg-yellow-400' },
    { type: 'lettuce', points: 3, color: 'bg-green-400' },
    { type: 'tomato', points: 4, color: 'bg-red-500' },
  ];

  const obstacleTypes = {
    basic: { color: 'bg-red-600', damage: 1, shape: 'rotate-45' },
    poison: { color: 'bg-purple-600', damage: 1, shape: 'rounded-full' },
    spike: { color: 'bg-orange-600', damage: 2, shape: 'rotate-180 triangle' },
    ghost: { color: 'bg-blue-400 opacity-50', damage: 1, shape: 'rounded-full' },
  };

  const calculateLevel = useCallback((currentScore) => {
    return Math.floor(currentScore / 100) + 1;
  }, []);

  const calculateSpeed = useCallback((currentLevel) => {
    return 5 + (currentLevel - 1) * 1.2;
  }, []);

  const showNewLevelAlert = (level) => {
    let message = '';
    switch(level) {
      case 2:
        message = 'Level 2: Watch out for purple poison orbs!';
        break;
      case 3:
        message = 'Level 3: Beware of orange spikes - they take 2 lives!';
        break;
      case 4:
        message = 'Level 4: Ghost obstacles appear - they\'re harder to see!';
        break;
      default:
        message = `Level ${level}: Everything gets faster!`;
    }
    setLevelMessage(message);
    setShowLevelAlert(true);
    setTimeout(() => setShowLevelAlert(false), 3000);
  };

  useEffect(() => {
    const newLevel = calculateLevel(score);
    if (newLevel !== level) {
      setLevel(newLevel);
      setSpeed(calculateSpeed(newLevel));
      showNewLevelAlert(newLevel);
    }
  }, [score, level, calculateLevel, calculateSpeed]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLives(3);
    setLevel(1);
    setSpeed(5);
    setIngredients([]);
    setObstacles([]);
    setSpecialObstacles([]);
  };

  const movePlayer = useCallback((e) => {
    if (!gameActive) return;

    const moveAmount = 30;
    if (e.key === 'ArrowLeft') {
      setPlayerPosition(prev => Math.max(30, prev - moveAmount));
    } else if (e.key === 'ArrowRight') {
      setPlayerPosition(prev => Math.min(GAME_WIDTH - 30, prev + moveAmount));
    }
  }, [gameActive]);

  useEffect(() => {
    window.addEventListener('keydown', movePlayer);
    return () => window.removeEventListener('keydown', movePlayer);
  }, [movePlayer]);

  const getObstacleType = (level) => {
    if (level >= 4) return obstacleTypes.ghost;
    if (level >= 3) return obstacleTypes.spike;
    if (level >= 2) return obstacleTypes.poison;
    return obstacleTypes.basic;
  };

  useEffect(() => {
    if (!gameActive) return;
  
    const gameLoop = setInterval(() => {
      const currentSpeed = speed + Math.floor(level / 2);
  
      setIngredients((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + currentSpeed }))
          .filter((item) => item.y < GAME_HEIGHT)
      );
  
      setObstacles((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + currentSpeed + 2 }))
          .filter((item) => item.y < GAME_HEIGHT)
      );
  
      setSpecialObstacles((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + currentSpeed + 3 }))
          .filter((item) => item.y < GAME_HEIGHT)
      );
  
      setIngredients((prev) =>
        prev.filter((ingredient) => {
          const caught =
            ingredient.y > GAME_HEIGHT - 100 &&
            Math.abs(ingredient.x - playerPosition) < 50;
  
          if (caught) setScore((s) => s + ingredient.points);
          return !caught;
        })
      );
  
      const checkObstacleCollision = (obstacle) => {
        return (
          obstacle.y > GAME_HEIGHT - 100 &&
          Math.abs(obstacle.x - playerPosition) < 50
        );
      };
  
      setObstacles((prev) =>
        prev.filter((obstacle) => {
          const hit = checkObstacleCollision(obstacle);
          if (hit) setLives((l) => Math.max(0, l - 1));
          return !hit;
        })
      );
  
      setSpecialObstacles((prev) =>
        prev.filter((obstacle) => {
          const hit = checkObstacleCollision(obstacle);
          if (hit) setLives((l) => Math.max(0, l - obstacle.damage));
          return !hit;
        })
      );
    }, 50);
  
    const spawnIngredient = setInterval(() => {
      if (Math.random() < 0.5 + level * 0.05) {
        const ingredient =
          ingredientTypes[Math.floor(Math.random() * ingredientTypes.length)];
        setIngredients((prev) => [
          ...prev,
          {
            ...ingredient,
            x: Math.random() * (GAME_WIDTH - 60) + 30,
            y: -20,
            id: Date.now(),
          },
        ]);
      }
    }, Math.max(400, 1000 - level * 70));
  
    const spawnObstacle = setInterval(() => {
      if (Math.random() < 0.3 + level * 0.04) {
        const obstacleType = getObstacleType(level);
        const newObstacle = {
          x: Math.random() * (GAME_WIDTH - 60) + 30,
          y: -20,
          id: Date.now(),
          damage: obstacleType.damage,
          color: obstacleType.color,
          shape: obstacleType.shape,
        };
  
        if (level >= 2) {
          setSpecialObstacles((prev) => [...prev, newObstacle]);
        } else {
          setObstacles((prev) => [...prev, newObstacle]);
        }
      }
    }, Math.max(800, 2000 - level * 150));
  
    return () => {
      clearInterval(gameLoop);
      clearInterval(spawnIngredient);
      clearInterval(spawnObstacle);
    };
  }, [
    gameActive,
    playerPosition,
    level,
    speed,
    ingredientTypes,
    getObstacleType,
  ]);
  

  useEffect(() => {
    if (lives <= 0) {
      setGameActive(false);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [lives, score, highScore]);

  const renderHearts = () => {
    const heartsArray = [];
    for (let i = 0; i < Math.max(0, lives); i++) {
      heartsArray.push(
        <Heart key={i} className="w-6 h-6 text-red-500 fill-red-500" />
      );
    }
    return heartsArray;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="mb-4 flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xl">Level {level}</span>
        </div>
        <div className="text-white text-xl">Score: {score}</div>
        <div className="flex items-center gap-1">
          {renderHearts()}
        </div>
        <div className="text-white text-xl">High Score: {highScore}</div>
      </div>

      {/* Level Alert */}
      {showLevelAlert && (
        <div className="absolute top-4 z-50 transition-all duration-500 transform">
          <div className="bg-yellow-100 border-yellow-500">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-bold">{levelMessage}</span>
          </div>
        </div>
      )}

      <div 
        className="relative bg-gray-800 rounded-lg overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="text-4xl text-white mb-4">
              {lives <= 0 ? 'Game Over!' : 'Space Burger'}
            </div>
            {lives <= 0 && (
              <div className="text-2xl text-yellow-400 mb-4">
                You reached Level {level}!
              </div>
            )}
            {lives <= 0 && score === highScore && score > 0 && (
              <div className="flex items-center gap-2 text-yellow-400 mb-4">
                <Trophy />
                <span>New High Score!</span>
              </div>
            )}
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {lives <= 0 ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        )}

        {/* Player */}
        <div
          className="absolute bottom-0 transition-all duration-100"
          style={{ left: playerPosition - 25 }}
        >
          <div className="w-[50px] h-[50px] bg-white rounded-lg relative">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Falling Ingredients */}
        {ingredients.map(ingredient => (
          <div
            key={ingredient.id}
            className={`absolute w-8 h-8 ${ingredient.color} rounded-full`}
            style={{ left: ingredient.x, top: ingredient.y }}
          />
        ))}

        {/* Basic Obstacles */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="absolute w-6 h-6 bg-red-600 rotate-45"
            style={{ left: obstacle.x, top: obstacle.y }}
          />
        ))}

        {/* Special Obstacles */}
        {specialObstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className={`absolute w-6 h-6 ${obstacle.color} ${obstacle.shape}`}
            style={{ left: obstacle.x, top: obstacle.y }}
          />
        ))}

      </div>

      <style jsx>{`
        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>

      <div className="mt-4 text-white text-center">
        <p>Use ← and → arrow keys to move</p>
        <p>Catch the ingredients, avoid the obstacles!</p>
        <p className="text-yellow-400">Every 100 points advances you to the next level!</p>
      </div>
    </div>
  );
};

export default SpaceBurgerGame;

