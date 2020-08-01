import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { eachDayOfInterval } from "date-fns";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";
import { splitEvery } from "ramda";
import { getCalendarBoundaries } from "../functions";

const year = (state) => state.calendar.year;
const month = (state) => state.calendar.month;

const calendarDataSelector = createSelector([year, month], (year, month) => {
  const currentMonthDate = new Date(year, month);

  const { start, end } = getCalendarBoundaries(currentMonthDate);

  const calendar = splitEvery(
    7,
    eachDayOfInterval({
      start,
      end,
    })
  );

  return { calendar, currentMonthDate };
});

function CalendarContainer() {
  const { calendar, currentMonthDate } = useSelector(calendarDataSelector);

  return <Calendar data={calendar} currentMonthDate={currentMonthDate} />;
}

export default CalendarContainer;
