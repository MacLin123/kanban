import type { TaskStatus } from "./task";

export interface Column {
  type: TaskStatus;
  label: string;
}
