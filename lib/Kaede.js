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

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const inputWidth = width * 0.6;

    return (
      <View style={[containerStyle, styles.container]} onLayout={this._onLayout}>
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
            style={[styles.textInput, inputStyle]}
            value={value}
            onBlur={this._onBlur}
            onChange={this._onChange}
          />
        </Animated.View>
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={{
            width,
            marginRight: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, inputWidth * -1],
            }),
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
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    padding: 16,
    fontSize: 18,
    color: '#6a7989',
    backgroundColor: '#EBEAEA',
  },
  textInput: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 18,
  },
});
