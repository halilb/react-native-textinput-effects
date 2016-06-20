import React, { PropTypes, Component } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

export default class Kaede extends BaseInput {

  static propTypes = {
    borderColor: PropTypes.string,

    /*
     * this is used to set backgroundColor of label mask.
     * this should be replaced if we can find a better way to mask label animation.
     */
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    borderColor: 'red',
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      backgroundColor: maskColor,
      borderColor,
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;

    return (
      <View style={[containerStyle, styles.container, { height: 60 }]} onLayout={this._onLayout}>
        <TextInput
          ref="input"
          {...this.props}
          style={[styles.textInput, inputStyle, { width, height: 30 }]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
        />
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={[styles.labelContainer, {
            opacity: focusedAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0, 1],
            }),
            top: focusedAnim.interpolate({
              inputRange: [0, 0.5, 0.51, 1],
              outputRange: [24, 24, 0, 0],
            }),
            left: focusedAnim.interpolate({
              inputRange: [0, 0.5, 0.51, 1],
              outputRange: [16, 32, 0, 16],
            }),
          }]}>
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={[styles.labelMask, { backgroundColor: maskColor }]} />
        <Animated.View
          style={[styles.border, {
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: borderColor,
          }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 2,
  },
  labelContainer: {
    position: 'absolute',
  },
  label: {
    fontSize: 18,
    color: '#6a7989',
  },
  textInput: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    color: 'black',
    fontSize: 18,
  },
  labelMask: {
    height: 24,
    width: 16,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});
