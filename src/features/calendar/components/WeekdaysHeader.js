import React from "react";
import { Box, Flex } from "theme-ui";

const weekdayStyle = {
  bg: "primary",
  width: "100%",
  textAlign: "center",
  color: "white",
};

const Weekday = ({ children }) => <Box sx={weekdayStyle}>{children}</Box>;

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default () => (
  <Flex sx={{ justifyContent: "space-between" }}>
    {weekdays.map((day) => (
      <Weekday key={day.toString()}>{day}</Weekday>
    ))}
  </Flex>
);
