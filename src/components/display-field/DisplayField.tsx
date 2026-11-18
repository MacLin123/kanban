import type { ReactNode } from "react";
import styles from "./DisplayField.module.css";

interface DisplayFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function DisplayField({ label, children, className }: DisplayFieldProps) {
  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}
