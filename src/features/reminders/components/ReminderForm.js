import React from "react";
import { Form } from "formik";
import { Flex, Box } from "theme-ui";
import Field from "components/Field";
import Button from "components/Button";

function ReminderForm(props) {
  const { values, isValid } = props;
  const buttonText = values.id ? "Edit Reminder" : "Add Reminder";

  return (
    <Form>
      <Field type="hidden" name="id" />
      <Flex sx={{ justifyContent: "space-between" }}>
        <Box>
          <Field
            type="text"
            name="reminder"
            label="Remind me of"
            maxLength={30}
          />
        </Box>
        <Box>
          <Field
            type="number"
            name="hour"
            label="Hour"
            min={0}
            max={23}
            maxLength={2}
            sx={{ width: "64px" }}
          />
        </Box>
        <Box>
          <Field
            type="number"
            name="minute"
            label="Minute"
            min={0}
            max={59}
            maxLength={2}
            sx={{ width: "64px" }}
          />
        </Box>
        <Box>
          <Field type="text" name="city" label="City" maxLength={30} />
        </Box>
        <Box>
          <Field
            type="color"
            name="color"
            label="Color"
            sx={{ height: "40px", cursor: "pointer" }}
          />
        </Box>
      </Flex>
      <Box mt={3}>
        <Flex sx={{ justifyContent: "center" }}>
          <Button type="submit" sx={{ width: "50%" }} disabled={!isValid}>
            {buttonText}
          </Button>
        </Flex>
      </Box>
    </Form>
  );
}

export default ReminderForm;
