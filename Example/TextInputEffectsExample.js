import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Kaede,
  Hoshi,
  Jiro,
  Isao,
  Madoka,
  Akira,
  Hideo,
} from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {

  render() {
    return (
      <ScrollView style={styles.container} keyboardDismissMode={'on-drag'}>
        <Kaede
          style={styles.input}
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
          style={styles.input}
          label={'Street'}
          backgroundColor={'#F9F7F6'}
          borderColor={'#00ffaa'}
        />
        <Jiro
          style={styles.input}
          label={'Cat\'s name'}
          borderColor={'#00ffaa'}
        />
        <Isao
          style={styles.input}
          label={'Middle name'}
          borderColor={'#da7071'}
        />
        <Akira
          style={styles.input}
          label={'Maiden Name'}
          borderColor={'#7A7593'}
        />
        <Madoka
          style={styles.input}
          label={'Weight'}
          borderColor={'#7A7593'}
        />
        <Hideo
          iconClass={FontAwesomeIcon}
          iconName={'envelope'}
          iconColor={'white'}
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
  input: {
    marginTop: 4,
  },
});
