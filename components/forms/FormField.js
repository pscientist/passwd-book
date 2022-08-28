import React from "react";
import { useFormikContext } from "formik";
import { Text, View } from 'react-native';
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import theme from "../../config/theme";

const LabelText = ({ labelText }) => {
  return (<Text style={{ color: 'white' }}>{labelText}</Text>)
}

function AppFormField({ name, width, formStyles, labelText, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        // width={width}
        // style={[theme.text, formStyles]}
        label={<LabelText labelText={labelText}></LabelText>}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
