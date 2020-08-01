import React from "react";
import { Flex, Box } from "theme-ui";
import WeekdaysHeader from "./WeekdaysHeader";
import { range } from "ramda";
import DayOfMonth from "./DayOfMonth";

const daysOfWeek = range(0, 7);
const fiveWeeks = range(0, 5);

function Calendar({ data }) {
  return (
    <Box>
      <WeekdaysHeader />
      {data.map((calendarRow) => (
        <Box>
          <Flex>
            {calendarRow.map((date) => (
              <DayOfMonth date={date} />
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default Calendar;
