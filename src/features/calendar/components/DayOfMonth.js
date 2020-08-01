import React from "react";
import { Box } from "theme-ui";
import { isWeekend, getDate, isToday, isSameMonth } from "date-fns";

function DayOfMonth(props) {
  const { date, currentMonthDate } = props;

  const weekend = isWeekend(date);
  const today = isToday(date);
  const fontWeight = today ? "bold" : "normal";
  const borderColor = today ? "secondary" : "lightgrey";
  const bg = weekend ? "muted" : "white";
  let color = weekend ? "highlight" : "text";
  color = isSameMonth(currentMonthDate, date) ? color : "grey";

  return (
    <Box
      sx={{
        color,
        bg,
        fontWeight,
        height: 128,
        width: "100%",
        border: "1px solid",
        borderColor,
      }}
    >
      {getDate(date)}
    </Box>
  );
}

export default DayOfMonth;
