import { createSelector } from "@reduxjs/toolkit";
import { getCalendarBoundaries } from "./functions";
import { splitEvery } from "ramda";
import { eachDayOfInterval, format } from "date-fns";
import { getDateTitle } from "./functions";

export const year = (state) => state.calendar.year;
export const month = (state) => state.calendar.month;
export const date = (state) => state.calendar.date;

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

export const dateDataSelector = createSelector(
  [year, month, date],
  (year, month, date) => {
    const selectedDate = new Date(year, month, date);
    const dateText = getDateTitle(selectedDate);

    return { show: date > 0, dateText, date: selectedDate };
  }
);
