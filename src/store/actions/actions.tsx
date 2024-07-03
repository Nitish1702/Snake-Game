import { createAction } from "@reduxjs/toolkit";

export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";
export const CONSUMED="CONSUMED"
export const DEAD="DEAD"

export const SET_DIS_DIRECTION = "SET_DIS_DIRECTION";
export const setDisDirection = createAction<string>(SET_DIS_DIRECTION);
export interface ISnakeCoord {
  x: number;
  y: number;
}
const directionMap = {
  MOVE_UP: { dx: 0, dy: -20 },
  MOVE_DOWN: { dx: 0, dy: 20 },
  MOVE_LEFT: { dx: -20, dy: 0 },
  MOVE_RIGHT: { dx: 20, dy: 0 },
};
export const makeMove = (dx: number, dy: number, move: string) => ({
    type: move,
    payload: {dx, dy}
        
})
export const consumed = () => ({
  type: CONSUMED,
  payload:directionMap
})
export const dead = () => ({
  type: DEAD,
})
// export const setDisDirection = (direction: string) => {
//     return {
//         type: SET_DIS_DIRECTION,
//         payload:direction
//     }
// }