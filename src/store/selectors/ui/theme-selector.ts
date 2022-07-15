import { AppState } from "../..";

export const getSelectedThemeName = (state: AppState) => state.ui.theme.name;
export const getSelectedTheme = (state: AppState) => state.ui.theme.config;
