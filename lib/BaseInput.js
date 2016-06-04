import React, {
  PropTypes,
  Component,
} from 'react';

import {
  Animated,
  Text,
  View,
} from 'react-native';

export default class BaseInput extends Component {

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    style: View.propTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
  };

  constructor(props, context) {
    super(props, context);

    this._onLayout = this._onLayout.bind(this);
    this._onChange = this._onChange.bind(this);
    this._focus = this._focus.bind(this);
    this._blur = this._blur.bind(this);

    this.state = {
      value: props.value,
      focusedAnim: new Animated.Value(props.value ? 1 : 0),
    };
  }

  _onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  }

  _onChange(event) {
    this.setState({
      value: event.nativeEvent.text,
    });
  }

  _focus() {
    this._toggle(true);
    this.refs.input.focus();
  }

  _blur() {
    if (!this.state.value) {
      this._toggle(false);
    }
  }

  _toggle(displayed) {
    Animated.timing(
      this.state.focusedAnim, {
        toValue: displayed ? 1 : 0,
        duration: 300,
      },
    ).start();
  }
}
