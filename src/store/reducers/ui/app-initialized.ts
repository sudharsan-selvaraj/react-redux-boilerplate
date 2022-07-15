import ReduxActionTypes from "../../redux-action-types";
import { createReducer } from "../../utils";

export type AppInitilisedState = boolean;

const initialState = false;

export default createReducer(initialState, {
  [ReduxActionTypes.APP_INITIALIZED]: () => true,
});
