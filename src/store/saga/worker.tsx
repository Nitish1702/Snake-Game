import { CallEffect, PutEffect, delay, put } from "redux-saga/effects";
import {
  DOWN,
  ISnakeCoord,
  LEFT,
  MOVE_RIGHT,
  RIGHT,
  SET_DIS_DIRECTION,
  UP,
  setDisDirection,
} from "../actions/actions.tsx";

export function* moveSaga(params: {
  type: string;
  payload: ISnakeCoord;
}): Generator<
  | PutEffect<{ type: string; payload: ISnakeCoord }>
  | PutEffect<{ type: string; payload: string }>
  | CallEffect<true>
> {
  while (true) {
    yield put({
        type: params.type.split('_')[1],
        payload: params.payload,
      });
    // console.log(params.type)
    switch (params.type.split('_')[1]) {
        case RIGHT:
            // console.log(params.type)
        yield put(setDisDirection(LEFT));
        break;

      case LEFT:
        yield put(setDisDirection(RIGHT));
        break;

      case UP:
        yield put(setDisDirection(DOWN));
        break;

      case DOWN:
        yield put(setDisDirection(UP));
        break;
    }
    yield delay(100);
  }
}
