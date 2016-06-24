import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Kaede,
  Hoshi,
  Jiro,
  Isao,
  Madoka,
  Akira,
} from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {

  render() {
    return (
      <ScrollView style={styles.container} keyboardDismissMode={'on-drag'}>
        <Kaede
          label={'Number'}
          labelStyle={{
            color: '#990fe2',
            backgroundColor: '#f5f785',
          }}
          inputStyle={{
            color: 'white',
            backgroundColor: '#d693f9',
          }}
          keyboardType="numeric"
        />
        <Hoshi
          label={'Street'}
          backgroundColor={'#F9F7F6'}
          borderColor={'#00ffaa'}
        />
        <Jiro
          label={'Cat\'s name'}
          borderColor={'#00ffaa'}
        />
        <Isao
          label={'Middle name'}
          borderColor={'#da7071'}
        />
        <Madoka
          style={{ marginTop: 8 }}
          label={'Weight'}
          borderColor={'#7A7593'}
        />
        <Akira
          label={'Maiden Name'}
          borderColor={'#7A7593'}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#F9F7F6',
  },
});
