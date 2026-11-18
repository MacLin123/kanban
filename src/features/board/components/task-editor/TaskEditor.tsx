import { useState } from "react";
import type { SubmitEvent } from "react";
import { Button } from "../../../../components/button";
import { Field } from "../../../../components/field";
import { Icon } from "../../../../components/icon";
import { dateField } from "../../../../helpers/dates";
import type { TaskFormValues } from "../../types/task";
import styles from "./TaskEditor.module.css";

interface TaskEditorProps {
  initialValues?: TaskFormValues;
  onSave: (values: TaskFormValues) => void;
  onClose: () => void;
}

export function TaskEditor({ initialValues, onSave, onClose }: TaskEditorProps) {
  const [task] = useState<TaskFormValues>(() => {
    if (initialValues) {
      const { text, startDay, endDay } = initialValues;
      return { text, startDay, endDay };
    }
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return { startDay: date.getTime(), endDay: date.getTime(), text: "" };
  });

  function save(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = String(data.get("text")).trim();
    const start = String(data.get("start"));
    const end = String(data.get("end"));
    const startDay =
      start === dateField(task.startDay) ? task.startDay : new Date(start + "T00:00:00").getTime();
    const endDay =
      end === dateField(task.endDay) ? task.endDay : new Date(end + "T00:00:00").getTime();

    if (!text || !Number.isFinite(startDay) || !Number.isFinite(endDay)) return;
    onSave({ text, startDay, endDay });
  }

  return (
    <form className={styles.root} onSubmit={save}>
      <Field label="Начало:">
        <input className={styles.input} name="start" type="date" defaultValue={dateField(task.startDay)} required />
      </Field>
      <Field label="Окончание:">
        <input className={styles.input} name="end" type="date" defaultValue={dateField(task.endDay)} required />
      </Field>
      <Field label="Описание:">
        <input
          className={styles.input}
          type="text"
          name="text"
          defaultValue={task.text}
          required
          onChange={(event) => {
            const input = event.currentTarget;
            input.setCustomValidity(input.value.trim() ? "" : "Введите описание задачи.");
          }}
        />
      </Field>
      <div className={styles.actions}>
        <Button variant="icon" onClick={onClose}>
          <Icon name="cross" color="secondary" />
        </Button>
        <Button variant="icon" type="submit">
          <Icon name="check" color="accent" />
        </Button>
      </div>
    </form>
  );
}
