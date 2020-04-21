import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";

const buildShadow = (
  width,
  height,
  radius,
  shadowColor = "#000000",
  shadowOpacity = 0.4
) => ({
  shadowColor,
  shadowOffset: {
    height,
    width,
  },
  shadowOpacity,
  shadowRadius: radius / 2,
});

const ShadowItem = ({ backgroundColor, shadow, ...props }) => (
  <View
    {...props}
    {...buildShadow(...shadow)}
    backgroundColor={backgroundColor || "#ffffff"}
    style={StyleSheet.absoluteFill}
  />
);

ShadowItem.propTypes = {
  backgroundColor: PropTypes.string,
  shadow: PropTypes.array,
};

export default React.memo(ShadowItem);
