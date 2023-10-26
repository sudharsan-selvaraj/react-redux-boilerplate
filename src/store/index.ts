import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";
import saga from "./sagas";
import { UIState } from "./reducers/ui";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  enhancers: [applyMiddleware(sagaMiddleware)],
});

sagaMiddleware.run(saga);

export type AppState = {
  ui: UIState;
};
