import { formatDate } from "../../../helpers/dates";
import { columns } from "./columns";
import type { Task, TaskStatus } from "../types/task";

export function isOverdue(task: Pick<Task, "type" | "endDay">, today = new Date()): boolean {
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  return task.type !== "done" && task.endDay < startOfToday.getTime();
}

export function matchesSearch(task: Task, query: string): boolean {
  const value = query.trim().toLowerCase();
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    return formatDate(task.startDay) === value || formatDate(task.endDay) === value;
  }
  return task.text.toLowerCase().includes(value);
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return columns.some(({ type }) => type === value);
}

export function parseTasks(value: unknown): Task[] | undefined {
  if (!Array.isArray(value)) return;

  const tasks: Task[] = [];
  const ids = new Set<number>();

  for (const candidate of value as unknown[]) {
    if (typeof candidate !== "object" || candidate === null) return;
    const { id, type, startDay, endDay, text } = candidate as Record<string, unknown>;

    if (
      typeof id !== "number" ||
      !Number.isFinite(id) ||
      ids.has(id) ||
      !isTaskStatus(type) ||
      typeof text !== "string" ||
      typeof startDay !== "number" ||
      !Number.isFinite(new Date(startDay).getTime()) ||
      typeof endDay !== "number" ||
      !Number.isFinite(new Date(endDay).getTime())
    )
      return;

    ids.add(id);
    tasks.push({ id, type, startDay, endDay, text });
  }

  return tasks;
}
