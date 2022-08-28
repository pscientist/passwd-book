import React from "react";
import { Text } from "react-native";

import theme from "../config/theme";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[theme.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
