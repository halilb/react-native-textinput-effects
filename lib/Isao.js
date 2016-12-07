import React, { PropTypes } from 'react';
import {
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const LABEL_HEIGHT = 24;
const PADDING = 16;

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
      <View
        style={[containerStyle, {
          height: inputHeight + LABEL_HEIGHT,
        }]}
        onLayout={this._onLayout}
      >
        <View style={[styles.inputContainer, {
          height: inputHeight,
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
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View style={{
            height: LABEL_HEIGHT,
            width,
          }}>
            {/* passive label */}
            <Animated.Text style={[styles.label, labelStyle, {
              width,
              opacity: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, LABEL_HEIGHT],
              }),
              color: passiveColor,
            }]}>
              {label}
            </Animated.Text>
            {/* active label */}
            <Animated.Text style={[styles.label, labelStyle, {
              opacity: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [LABEL_HEIGHT * -1, 0],
              }),
              color: activeColor,
            }]}>
              {label}
            </Animated.Text>
          </View>
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
    paddingLeft: PADDING,
    height: LABEL_HEIGHT,
  },
  label: {
    position: 'absolute',
    height: LABEL_HEIGHT,
    left: PADDING,
    paddingTop: 4,
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    paddingHorizontal: PADDING,
    color: '#afb3b8',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 0,
  },
  border: {
    position: 'absolute',
    bottom: LABEL_HEIGHT,
    left: 0,
    right: 0,
  },
});
