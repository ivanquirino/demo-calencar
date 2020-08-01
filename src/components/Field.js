import React from "react";
import { Field as FormikField } from "formik";
import { Field as UIField } from "theme-ui";

export default function Field({ name, sx, ...props }) {
  return (
    <FormikField name={name}>
      {({ field, meta: { touched, error } }) => {
        const borderColor = touched && error ? "red" : "text";
        return <UIField {...field} {...props} sx={{ ...sx, borderColor }} />;
      }}
    </FormikField>
  );
}
