import { Flex, Text } from "theme-ui";
import Button from "../../../components/Button";
import React from "react";

function ReminderItem(props) {
  const { date, editReminder, deleteReminderClick, ...item } = props;
  const { id, color, reminderText } = item;

  return (
    <Flex
      key={id}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: 2,
        p: 2,
        border: "1px solid",
        borderColor: color,
        borderRadius: 4,
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Button
          sx={{ mr: 3 }}
          onClick={editReminder(item)}
          data-testid={`edit-${id}`}
        >
          Edit
        </Button>
        <Text>{reminderText}</Text>
      </Flex>
      <Button
        sx={{ bg: "red" }}
        onClick={deleteReminderClick(date, item.id)}
        data-testid={`delete-${id}`}
      >
        Delete
      </Button>
    </Flex>
  );
}
export default ReminderItem;
