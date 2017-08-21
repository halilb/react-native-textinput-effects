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

const LABEL_HEIGHT = 24;
const PADDING = 16;

export default class Akira extends BaseInput {
  static propTypes = {
    /*
     * this is applied as active border and label color
     */
    borderColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: '#7A7593',
    height: 48,
    animationDuration: 200,
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      labelStyle,
      borderColor,
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;

    return (
      <View style={containerStyle} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              width,
              height: LABEL_HEIGHT,
              transform: [
                {
                  translateY: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [LABEL_HEIGHT + PADDING, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
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
        {/* left border */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: inputHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 1],
            }),
            backgroundColor: borderColor,
          }}
        />
        {/* top border */}
        <Animated.View
          style={{
            position: 'absolute',
            top: LABEL_HEIGHT,
            width,
            height: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 1],
            }),
            backgroundColor: borderColor,
          }}
        />
        {/* right border */}
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: inputHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 1],
            }),
            backgroundColor: borderColor,
          }}
        />
        {/* bottom border */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            height: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 1],
            }),
            width,
            backgroundColor: borderColor,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#cc6055',
    textAlign: 'center',
  },
  textInput: {
    paddingHorizontal: PADDING,
    padding: 0,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});
