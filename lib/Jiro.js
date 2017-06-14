import React, { PropTypes } from 'react';
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

const PADDING = 16;

export default class Jiro extends BaseInput {

  static propTypes = {
    borderColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: 'red',
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
    const borderPositionAnimation = Animated.timing(this.state.borderPositionAnim, {
      toValue: animationValue,
      eaasing: Easing.bezier(0.2, 1, 0.3, 1),
      duration: 200,
      useNativeDriver: this.props.useNativeDriver || false
    });
    const borderHeightAnimation = Animated.timing(this.state.borderHeightAnim, {
      toValue: animationValue,
      eaasing: Easing.ease,
      duration: 200,
      useNativeDriver: this.props.useNativeDriver || false
    });
    const labelPositionAnimation = Animated.timing(this.state.labelPositionAnim, {
      toValue: animationValue,
      eaasing: Easing.ease,
      duration: 200,
      useNativeDriver: this.props.useNativeDriver || false
    });

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
    } = this.props;
    const {
      width,
      borderPositionAnim,
      borderHeightAnim,
      labelPositionAnim,
      value,
    } = this.state;
    const totalHeight = inputHeight + (2 * PADDING);
    const BORDER_HEIGHT = 3;
    return (
      <View
        style={[containerStyle, {
          height: totalHeight,
        }]}
        onLayout={this._onLayout}
      >
        <Animated.View
          style={[styles.border, {
            top: totalHeight - BORDER_HEIGHT,
            height: totalHeight - BORDER_HEIGHT,
            transform: [{
              translateY: borderPositionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(3 * PADDING)],
              })
            }], 
          }]}
        >
          <Animated.View
            style={[{
              height: BORDER_HEIGHT,
              transform: [{
                scaleY: borderHeightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, (totalHeight - BORDER_HEIGHT + PADDING * 2) / BORDER_HEIGHT],
                })
              }],
              backgroundColor: borderColor,
            }]}
          />
        </Animated.View>
        <TextInput
          ref="input"
          {...this.props}
          style={[styles.textInput, inputStyle, {
            width,
            height: inputHeight,
          }]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={event => {
            this.useNativeDriver = this.props.useNativeDriver;
            this._onFocus(event);
          }}
          underlineColorAndroid={'transparent'}
        />
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View style={[styles.labelContainer, {
            bottom: PADDING / 2,
            transform: [{
              translateY: labelPositionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -((inputHeight + (PADDING / 4)) - PADDING / 2)],
              })
            }],
          }]}>
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
    left: PADDING,
    backgroundColor: 'transparent',
  },
  label: {
    fontFamily: 'Arial',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6a7989',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    left: PADDING,
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
