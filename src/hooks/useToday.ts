import { useEffect, useState } from "react";

export function useToday(): Date {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    const nextDay = new Date(today);
    nextDay.setHours(24, 0, 0, 0);

    const timer = window.setTimeout(
      () => setToday(new Date()),
      Math.max(0, nextDay.getTime() - Date.now()),
    );

    return () => window.clearTimeout(timer);
  }, [today]);

  return today;
}
