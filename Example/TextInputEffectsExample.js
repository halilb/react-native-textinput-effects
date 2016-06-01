import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Kaede } from 'react-native-textinput-effects';

const screenWidth = Dimensions.get('window').width;

export default class TextInputEffectsExample extends Component {

  render() {
    return (
      <ScrollView style={styles.container} keyboardDismissMode={'on-drag'}>
        <Kaede
          placeholder={'First Name'}
          width={screenWidth}
        />
        <Kaede
          placeholder={'Second Name'}
          width={screenWidth}
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
