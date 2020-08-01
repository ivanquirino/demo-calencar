import React from "react";
import { useDispatch } from "react-redux";
import { Box } from "theme-ui";
import { isWeekend, getDate, isToday, isSameMonth } from "date-fns";
import { setDate } from "../state";

const getStyle = (date, currentMonthDate) => {
  const weekend = isWeekend(date);
  const today = isToday(date);
  const fontWeight = today ? "bold" : "normal";
  const borderColor = today ? "secondary" : "lightgrey";
  const bg = weekend ? "muted" : "white";
  let color = weekend ? "highlight" : "text";
  color = isSameMonth(currentMonthDate, date) ? color : "gray";

  return {
    color,
    bg,
    fontWeight,
    height: 128,
    width: "100%",
    border: "1px solid",
    borderColor,
    cursor: "pointer",
    "&:hover": {
      borderColor: "green",
    },
  };
};

function DayOfMonth(props) {
  const { date, currentMonthDate } = props;

  const dispatch = useDispatch();

  const click = () => dispatch(setDate(date));

  const style = getStyle(date, currentMonthDate);

  return (
    <Box sx={style} onClick={click}>
      {getDate(date)}
    </Box>
  );
}

export default DayOfMonth;
