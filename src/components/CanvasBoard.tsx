import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IObjectBody,
  drawObject,
  getRandomPosition,
} from "../utilities/index.tsx";
import { IGlobalState } from "../store/reducers/index.tsx";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  consumed,
  dead,
  makeMove,
  setDisDirection,
} from "../store/actions/actions.tsx";

export interface ICanvasBoard {
  height: number;
  width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snake1 = useSelector((state: IGlobalState) => state.snake);
  const disallowedDirection = useSelector(
    (state: IGlobalState) => state.disallowedDirection
  );
  const dispatch = useDispatch();
  const [pos, setPos] = useState<IObjectBody>(
    getRandomPosition(height - 40, width - 40)
  );
  const [direction, setDirection] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [lastScore, setLastScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      setContext(ctx);
    }
  }, []);
  const isEating =
  // Snake head is within the bounds of the food (coming from any direction)
  (snake1[0].x >= pos.x && snake1[0].x < pos.x + 20 &&
   snake1[0].y >= pos.y && snake1[0].y < pos.y + 20) ||
  
  // Snake head is coming from the right side
  (snake1[0].x + 20 > pos.x && snake1[0].x + 20 <= pos.x + 20 &&
   snake1[0].y >= pos.y && snake1[0].y < pos.y + 20) ||
  
  // Snake head is coming from the left side
  (snake1[0].x < pos.x + 20 && snake1[0].x >= pos.x &&
   snake1[0].y >= pos.y && snake1[0].y < pos.y + 20) ||
  
  // Snake head is coming from the bottom side
  (snake1[0].x >= pos.x && snake1[0].x < pos.x + 20 &&
   snake1[0].y + 20 > pos.y && snake1[0].y + 20 <= pos.y + 20) ||
  
  // Snake head is coming from the top side
  (snake1[0].x >= pos.x && snake1[0].x < pos.x + 20 &&
   snake1[0].y < pos.y + 20 && snake1[0].y >= pos.y);
  
  const hasCollidedWithSelf = snake1.slice(1).some(segment =>
    snake1[0].x === segment.x && snake1[0].y === segment.y
  );
  const hasCollidedWithWalls = snake1[0].x > 1000 || snake1[0].y > 600 || snake1[0].x < 0 || snake1[0].y < 0
  const handleRestart = () => {
    dispatch(dead());
    setLastScore(score)
    setScore(0)
    context?.clearRect(0, 0, 600, 1000)
    setDirection('')
    setGameOver(false)
  }
  useEffect(() => {
    if(isEating){
      dispatch(consumed());
      setScore(score + 1);
      context?.clearRect(pos.x, pos.y, 20, 20);
      setPos(getRandomPosition(height - 40, width - 40));
    }
    if (hasCollidedWithSelf || hasCollidedWithWalls) {
      setDirection('')
      setGameOver(true)
    }
  }, [snake1, pos, dispatch, height, width, context, score]);
  useEffect(() => {
    
    if (context) {
      context.clearRect(0, 0, width, height); // Clear the canvas
      drawObject(context, snake1, "red");
      drawObject(context, [pos], "green");
    }
  }, [context, snake1, pos, width, height]);

  const moveSnake = useCallback(
    (dx: number, dy: number, newDirection: string) => {
     
      if (
        (newDirection === MOVE_RIGHT && direction !== MOVE_LEFT) ||
        (newDirection === MOVE_LEFT && direction !== MOVE_RIGHT) ||
        (newDirection === MOVE_UP && direction !== MOVE_DOWN) ||
        (newDirection === MOVE_DOWN && direction !== MOVE_UP)
      ) {
        dispatch(makeMove(dx, dy, newDirection));
        dispatch(setDisDirection(newDirection));
        setDirection(newDirection);
      }
    },
    [dispatch, direction]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
          moveSnake(0, -20, MOVE_UP);
          break;
        case "s":
          moveSnake(0, 20, MOVE_DOWN);
          break;
        case "a":
          moveSnake(-20, 0, MOVE_LEFT);
          break;
        case "d":
          event.preventDefault();
          moveSnake(20, 0, MOVE_RIGHT);
          break;
        default:
          break;
      }
    },
    [moveSnake]
  );
  

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {

    const interval = setInterval(() => {
      switch (direction) {
        case MOVE_UP:
          moveSnake(0, -20, direction);
          break;
        case MOVE_DOWN:
          moveSnake(0, 20, direction);
          break;
        case MOVE_LEFT:
          moveSnake(-20, 0, direction);
          break;
        case MOVE_RIGHT:
          moveSnake(20, 0, direction);
          break;
        default:
          break;
      }
    }, 200); // Move every 100ms

    return () => clearInterval(interval);
  }, [direction, moveSnake]);

  return (

    <div className="game-container">
        <style>
    {`
      .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .game-canvas {
        border: 3px solid #333;
        background-color: #fff;
        border-radius: 10px;

      }
      
      .info-panel {
        display:flex;
        align-items:center;
        text-align: center;
        margin-top: 5px;
        background-color: #fff;
        padding: 2px 50px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .score-display {
        font-size: 2em;
        margin-right: 50px;
      }
      
      .instructions {
        font-size: 1.2em;
        color: #666;
      }
      
      .game-over {
        position:absolute;
        top:30%;
        left:40%;
        width:200px;
        margin-top: 20px;
        background-color: #ffdede;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #ff5c5c;
        box-shadow: 0 4px 8px rgba(255, 92, 92, 0.2);
      }
      
      .restart-button {
        background-color: #ff5c5c;
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 1em;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .restart-button:hover {
        background-color: #e04b4b;
      }
    `}
  </style>
  <canvas
    ref={canvasRef}
    className="game-canvas"
    height={height}
    width={width}
  />
  <div className="info-panel">
        <h1 className="score-display">Score: {score} <small>LastScore: {lastScore}</small></h1>
    <span className="instructions">Use "W", "A", "S", "D" keys to control the snake (Start with D)</span>
    {gameOver && (
      <div className="game-over">
        <h2>Game Over!</h2>
            <button className="restart-button" onClick={handleRestart}>
          Restart
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default CanvasBoard;
