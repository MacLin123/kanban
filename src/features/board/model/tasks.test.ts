import { describe, expect, it } from "@jest/globals";
import { isOverdue } from "./tasks";

const today = new Date(2026, 10, 17, 15);

describe("isOverdue", () => {
  it("Задача с датой выполнения до сегодня просрочена в любом статусе кроме done", () => {
    const endDay = new Date(2026, 10, 16, 23, 59, 59).getTime();

    for (const type of ["todo", "in_progress", "review"] as const) {
      expect(isOverdue({ type, endDay }, today)).toBe(true);
    }
  });

  it("«Задача с датой выполнения на начало сегодняшнего дня не считается просроченной", () => {
    const endDay = new Date(2026, 10, 17).getTime();
    expect(isOverdue({ type: "todo", endDay }, today)).toBe(false);
  });

  it("Задача с датой выполнения на на завтра не просрочена", () => {
    const endDay = new Date(2026, 10, 18).getTime();
    expect(isOverdue({ type: "review", endDay }, today)).toBe(false);
  });

  it("Заверешнная задача никогда не просрочена", () => {
    const endDay = new Date(2026, 10, 16).getTime();
    expect(isOverdue({ type: "done", endDay }, today)).toBe(false);
  });
});
