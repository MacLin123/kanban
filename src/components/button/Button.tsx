import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: "text" | "ghost" | "icon";
  tone?: "neutral" | "accent" | "danger";
}

export function Button({
  children,
  variant = "text",
  tone = "neutral",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[styles.root, styles[variant], styles[tone], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
