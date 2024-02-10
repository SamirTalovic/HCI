import React from "react";
import { StyleSheet, Text } from "react-native";

const AppHeading = ({ text, style, ...rest }) => {
  return (
    <Text selectable style={[styles.heading, style]} {...rest}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#383838",
  },
});

export default AppHeading;
