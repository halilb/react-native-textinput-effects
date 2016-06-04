import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Kaede } from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {

  render() {
    return (
      <ScrollView style={styles.container} keyboardDismissMode={'on-drag'}>
        <Kaede
          label={'Name'}
          value={'halil'}
        />
        <Kaede
          label={'Number'}
          style={{ marginTop: 8 }}
          labelStyle={{
            color: 'red',
            backgroundColor: 'yellow',
          }}
          inputStyle={{
            color: 'white',
            backgroundColor: 'grey',
          }}
          keyboardType="numeric"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#F9F7F6',
  },
});
