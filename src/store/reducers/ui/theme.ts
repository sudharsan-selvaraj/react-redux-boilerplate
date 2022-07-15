import { ThemeConfig, ThemeNames } from "../../../interfaces/theme";
import { DEFAULT_THEME, themes } from "../../../theme";
import { createReducer } from "../../utils";

export type ThemeState = {
  name: ThemeNames;
  config: ThemeConfig;
};

const initialState: ThemeState = {
  name: DEFAULT_THEME,
  config: themes[DEFAULT_THEME],
};

export default createReducer(initialState, {});
