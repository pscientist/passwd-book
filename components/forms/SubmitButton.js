import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, buttonColor }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} color={buttonColor} />;
}

export default SubmitButton;
