import ReduxActionTypes from "../redux-action-types";

export const initializeApp = () => ({
  type: ReduxActionTypes.INIT_APP,
});

export const triggerAppInitialized = () => ({
  type: ReduxActionTypes.APP_INITIALIZED,
});
