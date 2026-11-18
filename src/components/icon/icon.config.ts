import check from "../../assets/check.svg";
import cross from "../../assets/cross.svg";
import edit from "../../assets/edit.svg";
import ghost from "../../assets/ghost.svg";
import happy from "../../assets/happy.svg";
import search from "../../assets/search.svg";
import smile from "../../assets/smile.svg";
import trash from "../../assets/trash.svg";
import upsideDown from "../../assets/upside-down.svg";

export const icons = {
  check,
  cross,
  edit,
  ghost,
  happy,
  search,
  smile,
  trash,
  "upside-down": upsideDown,
};

export type IconName = keyof typeof icons;

export const colors = {
  inherit: "currentColor",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  danger: "var(--icon-danger)",
  accent: "var(--accent)",
};

export type IconColor = keyof typeof colors;
