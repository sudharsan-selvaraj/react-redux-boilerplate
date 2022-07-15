import { combineReducers } from "@reduxjs/toolkit";
import AppInitialised, { AppInitilisedState } from "./app-initialized";
import ThemeReducer, { ThemeState } from "./theme";

export type UIState = {
  appInitialised: AppInitilisedState;
  theme: ThemeState;
};

export default combineReducers({
  appInitialised: AppInitialised,
  theme: ThemeReducer,
});
