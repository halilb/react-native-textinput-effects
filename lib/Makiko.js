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

    /*
     * Use iconSize and iconWidth to make the animation work for your icon
     */
    iconSize: PropTypes.number,
    iconWidth: PropTypes.number,

    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    iconColor: 'white',
    iconSize: 30,
    iconWidth: 60,
    height: 48,
    inputPadding: 16,
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    animationDuration: 300,
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      iconSize,
      iconWidth,
      style: containerStyle,
      height: inputHeight,
      inputPadding,
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
      <View
        style={[styles.container, containerStyle]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <View
            style={{
              position: 'absolute',
              height: inputHeight,
              width,
            }}
          >
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                top: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [8, iconSize * -1, iconSize * -1],
                }),
                left: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [inputPadding, -22, -22],
                }),
                height: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [iconSize, inputHeight * 2, inputHeight * 2],
                }),
                fontSize: focusedAnim.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [iconSize, iconSize * 4, iconSize * 4],
                }),
              }}
            />
            <Text
              style={[
                styles.label,
                labelStyle,
                {
                  left: iconWidth,
                  top: inputPadding,
                  color: iconColor,
                },
              ]}
            >
              {label}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            left: iconWidth,
            height: inputHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 0.2, 1],
              outputRange: [0, 0, width],
            }),
          }}
        />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
  },
  textInput: {
    paddingVertical: 0,
    color: 'black',
    fontSize: 18,
  },
});
