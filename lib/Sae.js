import React, { PropTypes } from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const LABEL_HEIGHT = 24;
const PADDING = 16;

export default class Sae extends BaseInput {

  static propTypes = {
    height: PropTypes.number,
    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as color prop.
     * This is also used as border color.
     */
    iconColor: PropTypes.string,
  };

  static defaultProps = {
    iconColor: 'white',
    height: 48,
    animationDuration: 300,
    iconName: 'pencil',
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
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
        style={[styles.container, containerStyle, {
          height: inputHeight + PADDING,
        }]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View style={{
            position: 'absolute',
            bottom: 0,
            transform: [{translateY: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(LABEL_HEIGHT + PADDING)],
            })}]
          }}>
            <Animated.Text style={[styles.label, labelStyle, {
              fontSize: 18,
              transform: [{
                scale: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.66], // We reduce the size by 33%
                })
              }]
            }]}>
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
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
          onFocus={event => {
            this.useNativeDriver = this.props.useNativeDriver;
            this._onFocus(event);
          }}
          underlineColorAndroid={'transparent'}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            transform: [{
              translateX: width !== undefined ? focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(width + PADDING)]
              }) : 0
            }]
          }}
        >
          <AnimatedIcon
            name={iconName}
            color={iconColor}
            style={{
              transform: [{
                rotate: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-90deg']
                })
              }],
              fontSize: 20,
            }}
          />
        </Animated.View>
        {/* bottom border */}
        <Animated.View
          style={{
            width,
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: 2,
            transform: [{
              rotateY: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['90deg', '0deg']
              })
            }],
            backgroundColor: iconColor
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  label: {
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#7771ab',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingTop: PADDING / 2,
    paddingLeft: 0,
    color: 'white',
    fontSize: 18,
  },
});
