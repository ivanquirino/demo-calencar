import React from "react";
import { useSelector } from "react-redux";
import { Box } from "theme-ui";
import { dateRemindersSelector } from "../selectors";

function RemindersMicroList({ date }) {
  const reminders = useSelector((state) => dateRemindersSelector(state, date));

  return reminders.map((item) => {
    const { short, color, id } = item;

    return (
      <Box
        key={id}
        sx={{
          border: "1px solid",
          borderColor: color,
          borderRadius: 4,
          my: "2px",
          mx: 1,
          px: "2px",
          textAlign: "left",
          fontSize: 0,
          overflowX: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {short}
      </Box>
    );
  });
}

export default RemindersMicroList;
