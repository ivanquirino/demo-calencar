import React from "react";
import { Formik } from "formik";
import { Box } from "theme-ui";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { submitReminder } from "../state";
import Reminders from "./Reminders";
import ReminderForm from "./ReminderForm";

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

function ReminderContainer({ date }) {
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
      {(formProps) => (
        <>
          <ReminderForm {...formProps} />
          <Box mt={4}>
            <Reminders date={date} setValues={formProps.setValues} />
          </Box>
        </>
      )}
    </Formik>
  );
}

export default ReminderContainer;
