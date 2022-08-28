import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../config/theme";

function AppTextInput({ icon, label, width = "100%", ...otherProps }) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.labelStyle}> {label} </Text>
      )}

      <View style={[styles.inputContainer, { width }]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={theme.colors.medium}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={theme.colors.medium}
          style={{ ...theme.text, flex: 1 }}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "#dde",
    borderRadius: 15,
    flexDirection: "row",
    padding: 5,
    marginVertical: 5,
    paddingLeft: 10,
  },
  labelStyle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "700",
    textTransform: "uppercase"
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
