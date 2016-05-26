import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import TextInputEffects from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TextInputEffects />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 16,
  },
});
