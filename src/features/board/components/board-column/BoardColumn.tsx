import type { ReactNode } from "react";
import { Icon } from "../../../../components/icon";
import type { IconName } from "../../../../components/icon";
import type { TaskStatus } from "../../types/task";
import styles from "./BoardColumn.module.css";

const statusIcons: Record<TaskStatus, IconName> = {
  todo: "happy",
  in_progress: "smile",
  review: "upside-down",
  done: "ghost",
};

interface BoardColumnProps {
  type: TaskStatus;
  label: string;
  children: ReactNode;
  actions?: ReactNode;
  isDropTarget: boolean;
  canDrop: boolean;
  onDragOver: (type: TaskStatus) => void;
  onDragLeave: (type: TaskStatus) => void;
  onDrop: (type: TaskStatus) => void;
}

export function BoardColumn({
  type,
  label,
  children,
  actions,
  isDropTarget,
  canDrop,
  onDragOver,
  onDragLeave,
  onDrop,
}: BoardColumnProps) {
  return (
    <section
      className={[styles.root, isDropTarget && styles.dropTarget].filter(Boolean).join(" ")}
      onDragOver={(event) => {
        if (!canDrop) return;
        event.preventDefault();
        onDragOver(type);
      }}
      onDragLeave={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        onDragLeave(type);
      }}
      onDrop={(event) => {
        if (!canDrop) return;
        event.preventDefault();
        onDrop(type);
      }}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.statusIcon}>
            <Icon name={statusIcons[type]} color="primary" />
          </span>
          <h2 id={`column-${type}`}>{label}</h2>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
