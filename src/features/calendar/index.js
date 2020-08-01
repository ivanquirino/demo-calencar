import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import {
  startOfMonth,
  endOfMonth,
  getDay,
  subDays,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import Calendar from "./components/Calendar";
import { useSelector } from "react-redux";
import { splitEvery } from "ramda";

const lastDayoFWeek = 6;

const year = (state) => state.calendar.year;
const month = (state) => state.calendar.month;

const calendarDataSelector = createSelector([year, month], (year, month) => {
  const currentMonth = new Date(year, month);
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const calendarStart = subDays(start, getDay(start));
  const calendarEnd = addDays(end, lastDayoFWeek - getDay(end));

  const calendarDays = splitEvery(
    7,
    eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    })
  );

  return calendarDays;
});

function CalendarContainer() {
  const data = useSelector(calendarDataSelector);

  return <Calendar data={data} />;
}

export default CalendarContainer;
