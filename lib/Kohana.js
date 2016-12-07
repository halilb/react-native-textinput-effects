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

export default class Kohana extends BaseInput {

  static propTypes = {
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
  };

  static defaultProps = {
    easing: Easing.bezier(0.2, 1, 0.3, 1),
  };

  render() {
    const {
      iconClass: Icon,
      iconColor,
      iconName,
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
    } = this.props;
    const { focusedAnim, value } = this.state;

    return (
      <View style={[styles.container, containerStyle]} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View style={{
            justifyContent: 'center',
            padding: PADDING,
            marginLeft: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-40, 0],
            }),
          }}>
            <Icon
              name={iconName}
              color={iconColor}
              size={25}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View style={{
            position: 'absolute',
            top: PADDING,
            left: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [PADDING, 80],
            }),
            opacity: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}>
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[styles.textInput, inputStyle]}
          value={value}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChange={this._onChange}
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
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#D2D2D2',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: PADDING,
    paddingVertical: 0,
    color: 'black',
    fontSize: 18,
  },
});
