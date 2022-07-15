import { combineReducers } from "@reduxjs/toolkit";
import UiReducer from "./ui";

export default combineReducers({
  ui: UiReducer,
});
