import React from "react";

import { useSelector } from "react-redux";
import Calendar from "./Calendar";
import MonthControl from "./MonthControl";
import { calendarDataSelector } from "../selectors";

function CalendarContainer() {
  const { calendar, currentMonthDate, monthText } = useSelector(
    calendarDataSelector
  );

  return (
    <>
      <MonthControl>{monthText}</MonthControl>
      <Calendar data={calendar} currentMonthDate={currentMonthDate} />
    </>
  );
}

export default CalendarContainer;
