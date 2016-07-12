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
    label: PropTypes.string,
    value: PropTypes.string,
    style: View.propTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    easing: PropTypes.func,
    animationDuration: PropTypes.number,

    /* those are TextInput props which are overridden
     * so, i'm calling them manually
     */
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this._onLayout = this._onLayout.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._focus = this._focus.bind(this);

    this.state = {
      value: props.value,
      focusedAnim: new Animated.Value(props.value ? 1 : 0),
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value !== this.state.value) this.setState({value: newProps.value})
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

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(event);
    }
  }

  _onBlur(event) {
    if (!this.state.value) {
      this._toggle(false);
    }

    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  }

  _onFocus(event) {
    this._toggle(true);

    const onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus(event);
    }
  }

  _focus() {
    this.refs.input.focus();
  }

  _toggle(displayed) {
    Animated.timing(
      this.state.focusedAnim, {
        toValue: displayed ? 1 : 0,
        duration: this.props.animationDuration,
        easing: this.props.easing,
      },
    ).start();
  }
}
