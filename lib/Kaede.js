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

export default class Kaede extends BaseInput {
  static propTypes = {
    easing: PropTypes.func,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    easing: Easing.bezier(0.2, 1, 0.3, 1),
    inputPadding: 16,
    height: 60,
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      height: inputHeight,
      inputPadding,
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
        <Animated.View
          style={{
            width: inputWidth,
            marginLeft: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [inputWidth * -1, 0],
            }),
          }}
        >
          <TextInput
            ref={this.input}
            {...this.props}
            style={[styles.textInput, inputStyle, {
              height: inputHeight,
              padding: inputPadding,
            }]}
            value={value}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            onChange={this._onChange}
            underlineColorAndroid={'transparent'}
          />
        </Animated.View>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
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
            }}
          >
            <Text style={[styles.label, labelStyle, {
              marginHorizontal: inputPadding,
            }]}>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a7989',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
