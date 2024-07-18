import { useState, useEffect, useRef } from 'react';
import './GameBoard.scss';
const GameBoard = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [food, setFood] = useState({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
  const [gameOver, setGameOver] = useState(false);
  const boardRef = useRef();
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        if (
          head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }
        newSnake.unshift(head);
        return newSnake;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [direction, food, gameOver]);
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    setGameOver(false);
  };
  return (
    <div className="game-board" ref={boardRef}>
      {snake.map((segment, index) => (
        <div key={index} className="snake-segment" style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }} />
      ))}
      <div className="food" style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }} />
      {gameOver && <div className="game-over">Game Over</div>}
      <button onClick={resetGame} className="reset-button">Restart</button>
    </div>
  );
};
export default GameBoard;