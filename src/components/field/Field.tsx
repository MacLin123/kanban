import type { ReactNode } from "react";
import styles from "./Field.module.css";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <label className={styles.root}>
      <span className={styles.label}>{label}</span>
      {children}
    </label>
  );
}
