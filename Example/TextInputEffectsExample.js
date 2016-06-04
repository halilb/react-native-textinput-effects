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
          placeholder={'First Name'}
          value={'halil'}
        />
        <Kaede
          placeholder={'Second Name'}
          style={{ marginTop: 8 }}
          labelStyle={{
            color: 'red',
            backgroundColor: 'yellow',
          }}
          inputStyle={{
            color: 'white',
            backgroundColor: 'grey',
          }}
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
