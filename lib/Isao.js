import React, { PropTypes, Component } from 'react';
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

const LABEL_HEIGHT = 24;

export default class Isao extends BaseInput {

  static propTypes = {
    /*
     * this is applied as passive border and label color
     */
    passiveColor: PropTypes.string,
    /*
     * this is applied as active border and label color
     */
    activeColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    activeColor: 'red',
    passiveColor: 'white',
    height: 48,
    easing: Easing.bezier(0.2, 1, 0.3, 1),
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      labelStyle,
      activeColor,
      passiveColor,
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;

    return (
      <View style={containerStyle} onLayout={this._onLayout}>
        <View style={[styles.inputContainer, {
          borderBottomColor: passiveColor,
        }]}>
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
            onFocus={this._onFocus}
          />
        </View>
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={[styles.labelContainer, {
            transform: [{
              translateY: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, LABEL_HEIGHT * -1],
              }),
            }],
          }]}>
            <Animated.Text style={[styles.label, labelStyle, {
              opacity: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              color: passiveColor,
            }]}>
              {label}
            </Animated.Text>
            <Animated.Text style={[styles.label, labelStyle, {
              opacity: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              color: activeColor,
            }]}>
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.border, {
            height: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 8],
            }),
            width,
            backgroundColor: activeColor,
          }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
  },
  labelContainer: {
    paddingLeft: 16,
    height: LABEL_HEIGHT,
  },
  label: {
    paddingTop: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    paddingHorizontal: 16,
    color: '#afb3b8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  border: {
    position: 'absolute',
    bottom: LABEL_HEIGHT,
    left: 0,
    right: 0,
  },
});
