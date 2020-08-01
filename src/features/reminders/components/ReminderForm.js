import React from "react";
import { Formik, Form } from "formik";
import { Flex, Box } from "theme-ui";
import * as Yup from "yup";
import Field from "components/Field";
import Button from "components/Button";
import { useDispatch } from "react-redux";
import { submitReminder } from "../state";
import Reminders from "./Reminders";

const initialValues = {
  id: "",
  reminder: "",
  hour: "",
  minute: "",
  city: "",
  color: "",
};

const validationSchema = Yup.object().shape({
  reminder: Yup.string().required().max(30),
  hour: Yup.number().required().min(0).max(23),
  minute: Yup.number().required().min(0).max(59),
  city: Yup.string().required(),
  color: Yup.string().required(),
});

function ReminderForm({ date }) {
  const dispatch = useDispatch();

  const submitForm = (values, actions) => {
    dispatch(submitReminder(date, values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={submitForm}
    >
      {({ isValid, setValues, values }) => {
        const buttonText = values.id ? "Edit Reminder" : "Add Reminder";

        return (
          <>
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
                  <Button
                    type="submit"
                    sx={{ width: "50%" }}
                    disabled={!isValid}
                  >
                    {buttonText}
                  </Button>
                </Flex>
              </Box>
            </Form>
            <Box mt={4}>
              <Reminders date={date} setValues={setValues} />
            </Box>
          </>
        );
      }}
    </Formik>
  );
}

export default ReminderForm;
