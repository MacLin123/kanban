import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { DisplayField } from "../../../../components/display-field";
import { formatDate } from "../../../../helpers/dates";
import type { Task, TaskFormValues } from "../../types/task";
import { TaskEditor } from "../task-editor/TaskEditor";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  isOverdue: boolean;
  isEditing: boolean;
  isOutsideSearch: boolean;
  isDragging: boolean;
  onEdit: (id: number) => void;
  onCloseEditor: () => void;
  onSave: (task: Task) => void;
  onDelete: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
}

export function TaskCard({
  task,
  isOverdue,
  isEditing,
  isOutsideSearch,
  isDragging,
  onEdit,
  onCloseEditor,
  onSave,
  onDelete,
  onDragStart,
  onDragEnd,
}: TaskCardProps) {
  function saveTask(updated: TaskFormValues) {
    onSave({ ...task, ...updated });
    onCloseEditor();
  }

  return (
    <li
      className={[styles.root, isDragging && styles.dragging, isEditing && styles.editing].filter(Boolean).join(" ")}
      draggable={!isEditing}
      onDragStart={() => onDragStart(task.id)}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <>
          {isOutsideSearch && (
            <p className={styles.searchNote}>Редактируемая задача вне результатов поиска</p>
          )}
          <TaskEditor initialValues={task} onClose={onCloseEditor} onSave={saveTask} />
        </>
      ) : (
        <>
          <dl className={styles.details}>
            <DisplayField label="Начало:">
              <span className={styles.date}>{formatDate(task.startDay)}</span>
            </DisplayField>
            <DisplayField label="Окончание:">
              <span className={[styles.date, isOverdue && styles.overdue].filter(Boolean).join(" ")}>{formatDate(task.endDay)}</span>
            </DisplayField>
            <DisplayField label="Описание:">
              <span className={styles.description}>{task.text}</span>
            </DisplayField>
          </dl>
          <div className={styles.actions}>
            <Button variant="ghost" tone="accent" onClick={() => onEdit(task.id)}>
              <Icon name="edit" color="inherit" />
            </Button>
            <Button
              variant="ghost"
              tone="danger"
              title="Удалить задачу"
              onClick={() => onDelete(task.id)}
            >
              <Icon name="trash" color="inherit" />
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
