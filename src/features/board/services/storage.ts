import sourceTasks from "../data/tasks.json";
import { parseTasks } from "../model/tasks";
import type { Task } from "../types/task";

const storageKey = "tasks";

export function loadTasks(): Task[] {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (error) {
    console.warn("localStorage недоступен", error);
  }

  if (saved !== null) {
    let value: unknown;
    try {
      value = JSON.parse(saved);
    } catch {
      throw new Error("Сохранённые задачи содержат некорректный JSON.");
    }

    const tasks = parseTasks(value);
    if (!tasks) {
      throw new Error("Сохранённые задачи имеют некорректную структуру.");
    }
    return tasks;
  }

  const initialTasks = parseTasks(sourceTasks);
  if (!initialTasks) {
    throw new Error("tasks.json задачи имеют некорректную структуру.");
  }
  return initialTasks;
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    console.warn("localStorage недоступен", error);
  }
}
