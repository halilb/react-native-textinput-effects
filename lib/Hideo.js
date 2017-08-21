import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

export default class Hideo extends BaseInput {
  static propTypes = {
    /*
     * this is applied as background color of icon
     */
    iconBackgroundColor: PropTypes.string,

    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop
     */
    iconColor: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as size prop.
     */
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    iconColor: 'white',
    iconSize: 25,
    iconBackgroundColor: '#899dda',
    height: 48,
    animationDuration: 200,
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconSize,
      iconName,
      iconBackgroundColor,
      style: containerStyle,
      inputStyle,
      height: inputHeight,
    } = this.props;
    const {
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
          <Animated.View
            style={{
              backgroundColor: iconBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              height: inputHeight,
              width: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [60, 40],
              }),
            }}
          >
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                fontSize: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [iconSize, iconSize * 0.6],
                }),
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[styles.textInput, inputStyle]}
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
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 0,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 18,
  },
});
