type Color = string;

export type ThemeConfig = {
  colors: Record<string, Color>;
};

export enum ThemeNames {
  LIGHT = "light",
}
