import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

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
    /*
     * active border height
     */
    borderHeight: PropTypes.number,
    labelHeight: PropTypes.number,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    activeColor: 'red',
    passiveColor: 'white',
    height: 48,
    labelHeight: 24,
    inputPadding: 16,
    borderHeight: 8,
    easing: Easing.bezier(0.2, 1, 0.3, 1),
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      borderHeight,
      inputPadding,
      labelHeight,
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
        style={[
          containerStyle,
          {
            height: inputHeight + labelHeight,
          },
        ]}
        onLayout={this._onLayout}
      >
        <View
          style={[
            styles.inputContainer,
            {
              height: inputHeight,
              borderBottomColor: passiveColor,
            },
          ]}
        >
          <TextInput
            ref={this.input}
            {...this.props}
            style={[
              styles.textInput,
              inputStyle,
              {
                width,
                height: inputHeight,
                paddingHorizontal: inputPadding,
              },
            ]}
            value={value}
            onBlur={this._onBlur}
            onChange={this._onChange}
            onFocus={this._onFocus}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View
            style={{
              height: labelHeight,
              width,
            }}
          >
            {/* passive label */}
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  width,
                  opacity: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                  bottom: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, labelHeight],
                  }),
                  color: passiveColor,
                  height: labelHeight,
                  left: inputPadding,
                },
              ]}
            >
              {label}
            </Animated.Text>
            {/* active label */}
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  opacity: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  bottom: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [labelHeight * -1, 0],
                  }),
                  color: activeColor,
                  height: labelHeight,
                  left: inputPadding,
                },
              ]}
            >
              {label}
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.border,
            {
              height: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, borderHeight],
              }),
              width,
              backgroundColor: activeColor,
              bottom: labelHeight,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 2,
  },
  label: {
    position: 'absolute',
    paddingTop: 4,
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    color: '#afb3b8',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 0,
  },
  border: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
