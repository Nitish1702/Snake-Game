import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import watcher from "./saga/watcher.tsx";
import gameReducer from "./reducers/index.tsx";
// import watcherSagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer:gameReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(watcher);
export default store;