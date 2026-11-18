export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export interface Task {
  id: number;
  type: TaskStatus;
  startDay: number;
  endDay: number;
  text: string;
}

export type TaskDraft = Omit<Task, "id">;
export type TaskFormValues = Pick<Task, "text" | "startDay" | "endDay">;

