import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

export default class Jiro extends BaseInput {
  static propTypes = {
    borderColor: PropTypes.string,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: 'red',
    inputPadding: 16,
    height: 48,
  };

  constructor(props, context) {
    super(props, context);

    const animationValue = props.value ? 1 : 0;
    this.state = {
      value: props.value,
      borderPositionAnim: new Animated.Value(animationValue),
      borderHeightAnim: new Animated.Value(animationValue),
      labelPositionAnim: new Animated.Value(animationValue),
    };
  }

  _toggle(isActive) {
    const animationValue = isActive ? 1 : 0;
    const borderPositionAnimation = Animated.timing(
      this.state.borderPositionAnim,
      {
        toValue: animationValue,
        eaasing: Easing.bezier(0.2, 1, 0.3, 1),
        duration: 200,
      }
    );
    const borderHeightAnimation = Animated.timing(this.state.borderHeightAnim, {
      toValue: animationValue,
      eaasing: Easing.ease,
      duration: 200,
    });
    const labelPositionAnimation = Animated.timing(
      this.state.labelPositionAnim,
      {
        toValue: animationValue,
        eaasing: Easing.ease,
        duration: 200,
      }
    );

    if (isActive) {
      Animated.sequence([
        borderPositionAnimation,
        Animated.parallel([labelPositionAnimation, borderHeightAnimation]),
      ]).start();
    } else {
      Animated.sequence([
        borderHeightAnimation,
        Animated.parallel([borderPositionAnimation, labelPositionAnimation]),
      ]).start();
    }
  }

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      borderColor,
      height: inputHeight,
      inputPadding,
    } = this.props;
    const {
      width,
      borderPositionAnim,
      borderHeightAnim,
      labelPositionAnim,
      value,
    } = this.state;
    const totalHeight = inputHeight + 2 * inputPadding;

    return (
      <View
        style={[
          containerStyle,
          {
            height: totalHeight,
          },
        ]}
        onLayout={this._onLayout}
      >
        <Animated.View
          style={[
            styles.border,
            {
              height: borderHeightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [3, inputHeight],
              }),
              top: borderPositionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [totalHeight - 3, 2 * inputPadding],
              }),
              backgroundColor: borderColor,
            },
          ]}
        />
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
              left: inputPadding,
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
                bottom: labelPositionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [inputPadding / 2, inputHeight + inputPadding / 4],
                }),
                left: inputPadding,
              },
            ]}
          >
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6a7989',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
