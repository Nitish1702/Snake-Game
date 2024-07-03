import {
  CONSUMED,
  DEAD,
  DOWN,
  LEFT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RIGHT,
  SET_DIS_DIRECTION,
  UP,
  setDisDirection,
} from "../actions/actions.tsx";

interface ISnakeCoord {
  x: number;
  y: number;
}

export interface IGlobalState {
  snake: ISnakeCoord[] | [];
  score: number;
  gameOver: boolean;
  disallowedDirection: string;


}

export const initialState: IGlobalState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  score: 0,
  gameOver: false,

};

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MOVE_RIGHT:
    case MOVE_LEFT:
    case MOVE_UP:
    case MOVE_DOWN: {
      let newSnake = [...state.snake];
      newSnake = [{
        x: state.snake[0].x + action.payload.dx,
        y: state.snake[0].y + action.payload.dy,
      }, ...newSnake];
      newSnake.pop();

      return {
        ...state,
        snake: newSnake,
      };
    }

    case SET_DIS_DIRECTION:
      return { ...state, disallowedDirection: action.payload };

    case CONSUMED:
      const direction = state.disallowedDirection
      const increasedSnake = [
        {
          x: state.snake[0].x + action.payload[direction].dx,
          y: state.snake[0].y + action.payload[direction].dy
        }, ...state.snake
      ]
      return { ...state, snake: increasedSnake, score: state.score + 1 };
    case DEAD: 
      state=initialState
      return {...state}
    
    
    default:
      return state;
  }
};

export default gameReducer;
