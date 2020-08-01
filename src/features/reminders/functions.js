import { compareAsc } from "date-fns";

export function reminderCompare(reminderA, reminderB) {
  const dateA = new Date(2000, 1, 1, reminderA.hour, reminderA.minute);
  const dateB = new Date(2000, 1, 1, reminderB.hour, reminderB.minute);

  return compareAsc(dateA, dateB);
}
