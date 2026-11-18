import { icons, colors } from "./icon.config";
import type { IconName, IconColor } from "./icon.config";
import styles from "./Icon.module.css";

interface IconProps {
  name: IconName;
  color?: IconColor;
}

export function Icon({ name, color = "secondary" }: IconProps) {
  const maskImage = `url("${icons[name]}")`;

  return (
    <span
      className={styles.root}
      style={{ backgroundColor: colors[color], maskImage, WebkitMaskImage: maskImage }}
    />
  );
}
