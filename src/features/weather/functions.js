import {
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
  addDays,
} from "date-fns";

// weather forecast api is limited to 5 days
export const decideFetchForecast = (timestamp) => {
  const start = startOfDay(new Date());
  const end = endOfDay(addDays(start, 5));
  const date = parseISO(timestamp);

  return isWithinInterval(date, { start, end });
};
