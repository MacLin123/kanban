import { useEffect, useState } from "react";
import { useToday } from "../../../../hooks/useToday";
import { matchesSearch } from "../../model/tasks";
import type { Task, TaskDraft, TaskStatus } from "../../types/task";
import { Board } from "../board/Board";
import { BoardHeader } from "../board-header/BoardHeader";
import { loadTasks, saveTasks } from "../../services/storage";
import styles from "./BoardPage.module.css";

export function BoardPage() {
  const [tasks, setTasks] = useState(loadTasks);
  const [query, setQuery] = useState("");
  const today = useToday();

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredCount = tasks.filter((task) =>
    matchesSearch(task, query),
  ).length;

  function handleMoveTask(id: number, type: TaskStatus) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id && task.type !== type ? { ...task, type } : task,
      ),
    );
  }

  function handleSaveTask(updated: Task) {
    setTasks((current) =>
      current.map((task) => (task.id === updated.id ? updated : task)),
    );
  }

  function handleDeleteTask(id: number) {
    if (!window.confirm(`Удалить задачу №${id}?`)) return;
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function handleCreateTask(draft: TaskDraft) {
    setTasks((current) => {
      const id = current.reduce((max, task) => Math.max(max, task.id), 0) + 1;
      return [...current, { ...draft, id }];
    });
    setQuery("");
  }

  return (
    <main className={styles.root}>
      <BoardHeader
        totalCount={tasks.length}
        filteredCount={filteredCount}
        query={query}
        onQueryChange={setQuery}
      />

      <Board
        tasks={tasks}
        today={today}
        query={query}
        onMoveTask={handleMoveTask}
        onSaveTask={handleSaveTask}
        onCreateTask={handleCreateTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
