import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { View } from "react-native";
import ShadowItem from "./ShadowItem";

const ShadowStack = React.forwardRef(
  (
    {
      backgroundColor,
      borderRadius,
      children,
      height,
      hideShadow,
      shadows,
      style,
      width,
      ...props
    },
    ref
  ) => {
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
      [backgroundColor, borderRadius, height, hideShadow, width]
    );

    return (
      <View
        {...props}
        backgroundColor="transparent"
        borderRadius={borderRadius}
        height={height}
        ref={ref}
        style={style}
        width={width}
        zIndex={1}
      >
        {shadows.map(renderItem)}
        <View
          {...props}
          borderRadius={borderRadius}
          height={height}
          overflow="hidden"
          style={StyleSheet.absoluteFill}
          width={width}
          zIndex={shadows.length + 2}
        >
          {children}
        </View>
      </View>
    );
  }
);

ShadowStack.displayName = "ShadowStack";

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
