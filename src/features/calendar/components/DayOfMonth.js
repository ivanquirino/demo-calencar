import React, { useMemo } from "react";
import { Box } from "theme-ui";
import { isWeekend, getDate } from "date-fns";

function DayOfMonth(props) {
  const { date } = props;

  const bg = isWeekend(date) ? "muted" : "white";
  return (
    <Box sx={{ height: 128, width: "100%", bg, border: "1px solid lightgrey" }}>
      {getDate(date)}
    </Box>
  );
}

export default DayOfMonth;
