import { ThemeConfig, ThemeNames } from "../interfaces/theme";
import { LightTheme } from "./light";

export const themes: { [key in ThemeNames]: ThemeConfig } = {
  [ThemeNames.LIGHT]: LightTheme,
};

export const DEFAULT_THEME = ThemeNames.LIGHT;
