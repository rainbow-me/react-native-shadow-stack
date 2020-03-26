import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import ShadowItem from "./ShadowItem";

const sx = StyleSheet.create({
  childrenWrapper: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  container: {
    backgroundColor: "transparent",
    zIndex: 1,
  },
});

const ShadowStack = ({
  backgroundColor,
  borderRadius,
  children,
  height,
  hideShadow,
  shadows,
  style,
  width,
  ...props
}) => {
  const renderItem = useCallback(
    (shadow, index) => (
      <ShadowItem
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        height={height}
        key={`${shadow.join("-")}${index}`}
        opacity={hideShadow ? 0 : 1}
        shadow={shadow}
        width={width}
        zIndex={index + 2}
      />
    ),
    [backgroundColor, borderRadius, height, hideShadow, shadows, width]
  );

  return (
    <View
      {...props}
      borderRadius={borderRadius}
      height={height}
      needsOffscreenAlphaCompositing
      style={[sx.container, style]}
      width={width}
    >
      {shadows.map(renderItem)}
      <View
        {...props}
        borderRadius={borderRadius}
        height={height}
        style={sx.childrenWrapper}
        width={width}
        zIndex={shadows.length + 2}
      >
        {children}
      </View>
    </View>
  );
};

ShadowStack.propTypes = {
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hideShadow: PropTypes.bool,
  shadows: PropTypes.arrayOf(PropTypes.array).isRequired,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ShadowStack.defaultProps = {
  shadows: [],
};

export default ShadowStack;
