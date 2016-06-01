import React, {
  PropTypes,
  Component
} from 'react';
import {
  Animated,
} from 'react-native';

export default class BaseInput extends Component {

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this);
    this._focus = this._focus.bind(this);
    this._blur = this._blur.bind(this);

    this.currentText = '';
    this.state = {
      focusedAnim: new Animated.Value(0),
    };
  }

  _onChange(event) {
    this.currentText = event.nativeEvent.text;
  }

  _focus() {
    this._toggle(true);
    this.refs.input.focus();
  }

  _blur() {
    if (!this.currentText) {
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
