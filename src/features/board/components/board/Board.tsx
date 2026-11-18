import { useState } from "react";
import { Button } from "../../../../components/button";
import { columns } from "../../model/columns";
import { isOverdue, matchesSearch } from "../../model/tasks";
import type {
  Task,
  TaskDraft,
  TaskFormValues,
  TaskStatus,
} from "../../types/task";
import { BoardColumn } from "../board-column/BoardColumn";
import { TaskCard } from "../task-card/TaskCard";
import { TaskEditor } from "../task-editor/TaskEditor";
import styles from "./Board.module.css";

type EditorState =
  | { mode: "create"; status: TaskStatus }
  | { mode: "edit"; taskId: number }
  | null;

interface BoardProps {
  tasks: Task[];
  today: Date;
  query: string;
  onMoveTask: (id: number, status: TaskStatus) => void;
  onSaveTask: (task: Task) => void;
  onCreateTask: (task: TaskDraft) => void;
  onDeleteTask: (id: number) => void;
}

export function Board({
  tasks,
  today,
  query,
  onMoveTask,
  onSaveTask,
  onCreateTask,
  onDeleteTask,
}: BoardProps) {
  const [editor, setEditor] = useState<EditorState>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dropColumn, setDropColumn] = useState<TaskStatus | null>(null);

  const editingId = editor?.mode === "edit" ? editor.taskId : null;
  const isFiltering = query.trim().length > 0;
  const visibleTasks = tasks
    .filter((task) => task.id === editingId || matchesSearch(task, query))
    .sort((first, second) => first.startDay - second.startDay);

  function startCreating() {
    setEditor({ mode: "create", status: "todo" });
  }

  function closeEditor() {
    setEditor(null);
  }

  function createTask(draft: TaskFormValues) {
    if (editor?.mode !== "create") return;
    onCreateTask({ ...draft, type: editor.status });
    closeEditor();
  }

  function editTask(id: number) {
    setEditor({ mode: "edit", taskId: id });
  }

  function finishDrag() {
    setDraggedId(null);
    setDropColumn(null);
  }

  function leaveColumn(type: TaskStatus) {
    setDropColumn((column) => (column === type ? null : column));
  }

  function dropTask(type: TaskStatus) {
    if (draggedId === null) return;
    onMoveTask(draggedId, type);
    finishDrag();
  }

  return (
    <div className={styles.scroll}>
      <div className={styles.board}>
        {columns.map(({ type, label }) => {
          const cards = visibleTasks.filter((task) => task.type === type);
          const showDraft = editor?.mode === "create" && editor.status === type;
          const emptyMessage =
            cards.length === 0 && !showDraft
              ? isFiltering
                ? "Нет совпадений"
                : "Нет задач"
              : undefined;
          const addButton = type === "todo" && (
            <Button
              variant="text"
              tone="accent"
              className={styles.addButton}
              onClick={startCreating}
              disabled={showDraft}
            >
              + Добавить
            </Button>
          );

          return (
            <BoardColumn
              key={type}
              type={type}
              label={label}
              isDropTarget={dropColumn === type}
              canDrop={draggedId !== null}
              onDragOver={setDropColumn}
              onDragLeave={leaveColumn}
              onDrop={dropTask}
              actions={addButton}
            >
              {showDraft && (
                <div className={styles.createCard}>
                  <TaskEditor onSave={createTask} onClose={closeEditor} />
                </div>
              )}
              {emptyMessage && (
                <p className={styles.emptyColumn}>{emptyMessage}</p>
              )}
              {cards.length > 0 && (
                <ul className={styles.cardList}>
                  {cards.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isOverdue={isOverdue(task, today)}
                      isEditing={editingId === task.id}
                      isOutsideSearch={
                        editingId === task.id && !matchesSearch(task, query)
                      }
                      isDragging={draggedId === task.id}
                      onEdit={editTask}
                      onCloseEditor={closeEditor}
                      onSave={onSaveTask}
                      onDelete={onDeleteTask}
                      onDragStart={setDraggedId}
                      onDragEnd={finishDrag}
                    />
                  ))}
                </ul>
              )}
            </BoardColumn>
          );
        })}
      </div>
    </div>
  );
}
