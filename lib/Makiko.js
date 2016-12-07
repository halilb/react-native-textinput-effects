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

const ICON_WIDTH = 60;
const ICON_SIZE = 30;
const PADDING = 16;

export default class Makiko extends BaseInput {

  static propTypes = {
    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,

    /*
     * Passed to react-native-vector-icons library as name prop.
     * This icon expands and covers the input.
     * So, the icon should not have any blank spaces for animation experience.
     * This is the limitation for Makiko.
     */
    iconName: PropTypes.string.isRequired,

    /*
     * Passed to react-native-vector-icons library as color prop
     */
    iconColor: PropTypes.string,
  };

  static defaultProps = {
    iconColor: 'white',
    height: 48,
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    animationDuration: 300,
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      label,
      labelStyle,
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

    return (
      <View style={[styles.container, containerStyle]} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View style={{
            position: 'absolute',
            height: inputHeight,
            width,
          }}>
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                top: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [8, ICON_SIZE * -1, ICON_SIZE * -1],
                }),
                left: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [PADDING, -22, -22],
                }),
                height: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [ICON_SIZE, inputHeight * 2, inputHeight * 2],
                }),
                fontSize: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [ICON_SIZE, ICON_SIZE * 4, ICON_SIZE * 4],
                }),
              }}
            />
            <Text style={[styles.label, labelStyle, { color: iconColor }]}>
              {label}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            left: ICON_WIDTH,
            height: inputHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 0.2, 1],
              outputRange: [0, 0, width],
            }),
          }}
        />
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CBCBCB',
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    top: PADDING,
    left: ICON_WIDTH,
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
  },
  textInput: {
    paddingHorizontal: PADDING,
    paddingVertical: 0,
    color: 'black',
    fontSize: 18,
  },
});
