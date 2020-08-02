import { compareAsc, formatISO, parseISO } from "date-fns";

export function reminderCompare(reminderA, reminderB) {
  const dateA = parseISO(reminderA.timestamp);
  const dateB = parseISO(reminderB.timestamp);

  return compareAsc(dateA, dateB);
}

export function getDateKey(date) {
  return formatISO(date, { representation: "date" });
}
