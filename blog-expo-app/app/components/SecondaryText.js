import React from "react";
import { Text } from "react-native";

const SecondaryText = ({ text, style }) => {
  return (
    <Text style={[{ fontSize: 14, color: "#827E7E" }, style]}>{text}</Text>
  );
};

export default SecondaryText;
