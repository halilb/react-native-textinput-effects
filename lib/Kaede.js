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

export default class Kaede extends BaseInput {

  static propTypes = {
    easing: PropTypes.func,
    height: PropTypes.number,
  };

  static defaultProps = {
    easing: Easing.bezier(0.2, 1, 0.3, 1),
    height: 60,
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      height: inputHeight,
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const inputWidth = width * 0.6;

    const flatLabelStyle = StyleSheet.flatten(labelStyle);
    let labelBackgroundColor = '#EBEAEA';
    if (flatLabelStyle && flatLabelStyle.backgroundColor) {
      labelBackgroundColor = flatLabelStyle.backgroundColor;
    }

    return (
      <View style={containerStyle} onLayout={this._onLayout}>
        <Animated.View style={{
          width: inputWidth,
          marginLeft: focusedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [inputWidth * -1, 0],
          }),
        }}>
          <TextInput
            ref="input"
            {...this.props}
            style={[styles.textInput, inputStyle, { height: inputHeight }]}
            value={value}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            onChange={this._onChange}
            underlineColorAndroid={'transparent'}
          />
        </Animated.View>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View style={{
            position: 'absolute',
            justifyContent: 'center',
            top: 0,
            height: inputHeight,
            width,
            left: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, inputWidth],
            }),
            backgroundColor: labelBackgroundColor,
          }}>
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
  label: {
    marginHorizontal: PADDING,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a7989',
  },
  textInput: {
    padding: PADDING,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
