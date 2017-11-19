import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const PADDING = 16;

export default class Hoshi extends BaseInput {
  static propTypes = {
    borderColor: PropTypes.string,

    /*
     * this is used to set backgroundColor of label mask.
     * this should be replaced if we can find a better way to mask label animation.
     */
    maskColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: 'red',
    height: 48,
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      maskColor,
      borderColor,
      height: inputHeight,
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const flatStyles = StyleSheet.flatten(containerStyle) || {};
    const containerWidth = flatStyles.width || width;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + PADDING,
            width: containerWidth,
          },
        ]}
        onLayout={this._onLayout}
      >
        <TextInput
          ref="input"
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
            },
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
        />
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
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
                  outputRange: [PADDING, 2 * PADDING, 0, PADDING],
                }),
              },
            ]}
          >
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={[styles.labelMask, { backgroundColor: maskColor }]} />
        <Animated.View
          style={[
            styles.border,
            {
              width: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width],
              }),
              backgroundColor: borderColor,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#b9c1ca',
  },
  labelContainer: {
    position: 'absolute',
  },
  label: {
    fontSize: 16,
    color: '#6a7989',
  },
  textInput: {
    position: 'absolute',
    bottom: 2,
    left: PADDING,
    padding: 0,
    color: '#6a7989',
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelMask: {
    height: 24,
    width: PADDING,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});
