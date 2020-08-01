import React from "react";
import { Flex, Box } from "theme-ui";
import WeekdaysHeader from "./WeekdaysHeader";
import DayOfMonth from "./DayOfMonth";

function Calendar({ data, currentMonthDate }) {
  return (
    <Box>
      <WeekdaysHeader />
      {data.map((calendarRow, i) => (
        <Box key={i.toString()}>
          <Flex>
            {calendarRow.map((date) => (
              <DayOfMonth
                key={date.toString()}
                date={date}
                currentMonthDate={currentMonthDate}
              />
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default Calendar;
