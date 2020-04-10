import PropTypes from "prop-types";
import React, { Component } from "react";
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

export default class ShadowStack extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    children: PropTypes.node,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hideShadow: PropTypes.bool,
    shadows: PropTypes.arrayOf(PropTypes.array).isRequired,
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    shadows: [],
  };

  renderItem = (shadow, index) => (
    <ShadowItem
      backgroundColor={this.props.backgroundColor}
      borderRadius={this.props.borderRadius}
      height={this.props.height}
      key={`${shadow.join("-")}${index}`}
      opacity={this.props.hideShadow ? 0 : 1}
      shadow={shadow}
      width={this.props.width}
      zIndex={index + 2}
    />
  );

  render = () => {
    const {
      backgroundColor,
      borderRadius,
      children,
      height,
      shadows,
      style,
      width,
      ...props
    } = this.props;

    return (
      <View
        {...props}
        borderRadius={borderRadius}
        height={height}
        needsOffscreenAlphaCompositing
        ref={ref}
        style={[sx.container, style]}
        width={width}
      >
        {shadows.map(this.renderItem)}
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
}
