import { takeLatest } from "redux-saga/effects"
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from "../actions/actions.tsx"
import { moveSaga } from "./worker.tsx"

function* watcher() {
    yield takeLatest(
        [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN],
        moveSaga
    )
}
export default watcher;