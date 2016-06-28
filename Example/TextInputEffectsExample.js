import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
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
  Kohana,
  Makiko,
  Sae,
} from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {

  render() {
    return (
      <ScrollView style={styles.container} keyboardDismissMode={'on-drag'}>
        <View style={[styles.card, { backgroundColor: '#8781bd' }]}>
          <Text style={styles.title}>Sae</Text>
          <Sae
            label={'Email Address'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
          />
          <Sae
            style={styles.input}
            label={'Invitation Code'}
            iconClass={FontAwesomeIcon}
          />
        </View>
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
          style={styles.input}
          iconClass={FontAwesomeIcon}
          iconName={'envelope'}
          iconColor={'white'}
        />
        <Kohana
          style={styles.input}
          label={'Phone'}
          iconClass={FontAwesomeIcon}
          iconName={'phone'}
          iconColor={'#ddd'}
        />
        <Makiko
          style={styles.input}
          label={'Comment'}
          iconClass={FontAwesomeIcon}
          iconName={'comment'}
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
  card: {
    height: 180,
  },
  input: {
    marginTop: 4,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});
