import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = ({
  width,
  height = 1,
  backgroundColor = "#d3d3d3",
  style,
}) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor,
          alignSelf: "center",
        },
        style,
      ]}
    />
  );
};

export default Separator;
