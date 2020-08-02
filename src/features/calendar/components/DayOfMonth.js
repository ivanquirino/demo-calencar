import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Text } from "theme-ui";
import { isWeekend, getDate, isToday, isSameMonth } from "date-fns";
import { setDate } from "../state";
import RemindersMicroList from "../../reminders/components/RemindersMicroList";
import { makeDayOfMonthForecastSelector } from "../../weather/selectors";
import { getDateTitle } from "../functions";

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

  const forecastSelector = useMemo(makeDayOfMonthForecastSelector, []);
  const forecast = useSelector((state) => forecastSelector(state, date));
  const dispatch = useDispatch();

  const click = () => dispatch(setDate(date));

  const style = getStyle(date, currentMonthDate);
  const title = getDateTitle(date);

  return (
    <Box sx={style} onClick={click} title={title}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Text>{getDate(date)}</Text>
        {forecast && <Text sx={{ fontSize: 0 }}>{forecast}</Text>}
      </Flex>

      <RemindersMicroList date={date} />
    </Box>
  );
}

export default DayOfMonth;
