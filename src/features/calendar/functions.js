import {
  addDays,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subDays,
} from "date-fns";

const lastDayOfWeek = 6;

export function getCalendarBoundaries(date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const start = subDays(monthStart, getDay(monthStart));
  const end = addDays(monthEnd, lastDayOfWeek - getDay(monthEnd));

  return { start, end };
}

export function getDateTitle(date) {
  return format(date, "MMMM d, yyyy");
}
