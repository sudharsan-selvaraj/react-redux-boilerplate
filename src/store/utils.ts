import { ReduxActionType } from "../interfaces/redux";

type createReducerActions = {
  [key: string]: (state: any, action: ReduxActionType<any>) => any;
};

export const createReducer = (
  initialState: any,
  matchers: createReducerActions,
) => {
  return (state = initialState, action: ReduxActionType<any>) => {
    if (matchers[action.type]) {
      return matchers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const logger = (payload: any) => {
  console.log(payload);
};
