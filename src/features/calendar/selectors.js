import { createSelector } from "@reduxjs/toolkit";
import { getCalendarBoundaries } from "./functions";
import { splitEvery } from "ramda";
import { eachDayOfInterval, format } from "date-fns";

export const year = (state) => state.calendar.year;
export const month = (state) => state.calendar.month;

export const calendarDataSelector = createSelector(
  [year, month],
  (year, month) => {
    const currentMonthDate = new Date(year, month);
    const monthText = format(currentMonthDate, "MMMM yyyy");

    const { start, end } = getCalendarBoundaries(currentMonthDate);

    const calendar = splitEvery(
      7,
      eachDayOfInterval({
        start,
        end,
      })
    );

    return { calendar, currentMonthDate, monthText };
  }
);
