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
    const { placeholder, width } = this.props;
    const { focusedAnim } = this.state;
    const inputWidth = width * 0.6;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.textInputContainer, {
          width: inputWidth,
          marginLeft: focusedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [inputWidth * -1, 0],
          }),
        }]}>
          <TextInput
            ref="input"
            style={styles.textInput}
            onBlur={this._blur}
            onChange={this._onChange}
          />
        </Animated.View>
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={[styles.placeholderContainer, {
            width,
            marginRight: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, inputWidth * -1],
            }),
          }]}>
            <Text style={styles.placeholder}>
              {placeholder}
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
  placeholderContainer: {
    backgroundColor: '#EBEAEA',
    height: 62,
  },
  placeholder: {
    padding: 16,
    fontSize: 18,
    color: '#6a7989',
  },
  textInputContainer: {
    height: 62,
    backgroundColor: 'white',
    padding: 16,
  },
  textInput: {
    height: 30,
    color: 'black',
    fontSize: 18,
  },
});
