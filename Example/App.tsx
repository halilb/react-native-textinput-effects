/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

declare const global: { HermesInternal: null | {} };

import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

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
  Fumi,
} from "react-native-textinput-effects";

const App = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card1, { backgroundColor: "#F9F7F6" }]}>
        <Text style={styles.title}>Kaede</Text>
        <Kaede label={"Website"} defaultValue={"Github"} editable={false} />
        <Kaede
          style={styles.input}
          label={"Number"}
          labelStyle={{
            color: "white",
            backgroundColor: "#fcb794",
          }}
          inputStyle={{
            color: "white",
            backgroundColor: "#db8d67",
          }}
          keyboardType="numeric"
        />
      </View>
      <View style={[styles.card2, { backgroundColor: "#8781bd" }]}>
        <Text style={styles.title}>Sae</Text>
        <Sae
          label={"Email Address"}
          iconClass={FontAwesomeIcon}
          iconName={"pencil"}
          iconColor={"white"}
        />
        <Sae
          style={styles.input}
          label={"Invitation Code"}
          iconClass={FontAwesomeIcon}
        />
      </View>
      <View style={[styles.card1, { backgroundColor: "#F9F7F6" }]}>
        <Text style={styles.title}>Hoshi</Text>
        <Hoshi label={"Town"} borderColor={"#b76c94"} maskColor={"#F9F7F6"} />
        <Hoshi
          style={styles.input}
          label={"Street"}
          maskColor={"#F9F7F6"}
          borderColor={"#7ac1ba"}
        />
      </View>
      <View style={[styles.card1, { backgroundColor: "#dee0e0" }]}>
        <Text style={styles.title}>Jiro</Text>
        <Jiro
          label={"Dog's name"}
          borderColor={"#9b537a"}
          inputStyle={{ color: "white" }}
        />
        <Jiro
          style={styles.input}
          label={"Cat's name"}
          borderColor={"#f7c665"}
          inputStyle={{ color: "white" }}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: "#a9ceca" }]}>
        <Text style={styles.title}>Fumi</Text>
        <Fumi
          label={"Course Name"}
          labelStyle={{ color: "#a3a3a3" }}
          inputStyle={{ color: "#f95a25" }}
          iconClass={FontAwesomeIcon}
          iconName={"university"}
          iconColor={"#f95a25"}
          iconSize={15}
        />
        <Fumi
          style={styles.input}
          label={"Degree"}
          iconClass={FontAwesomeIcon}
          iconName={"graduation-cap"}
          iconColor={"#77116a"}
        />
      </View>
      <View style={[styles.card1, { backgroundColor: "#7f3e61" }]}>
        <Text style={styles.title}>Isao</Text>
        <Isao
          label={"First Name"}
          activeColor={"#da7071"}
          passiveColor={"#dadada"}
        />
        <Isao
          style={styles.input}
          label={"Middle Name"}
          activeColor={"#da7071"}
          passiveColor={"#dadada"}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: "#f9f3cf" }]}>
        <Text style={styles.title}>Akira</Text>
        <Akira
          label={"First Name"}
          borderColor={"#a5d1cc"}
          labelStyle={{ color: "#ac83c4" }}
        />
        <Akira
          style={styles.input}
          label={"Maiden Name"}
          borderColor={"#a5d1cc"}
          labelStyle={{ color: "#ac83c4" }}
        />
      </View>
      <View style={styles.card2}>
        <Text style={styles.title}>Madoka</Text>
        <Madoka
          style={styles.input}
          label={"Frequency"}
          borderColor={"#aee2c9"}
          labelStyle={{ color: "#008445" }}
          inputStyle={{ color: "#f4a197" }}
        />
        <Madoka
          style={styles.input}
          label={"Weight"}
          borderColor={"#aee2c9"}
          labelStyle={{ color: "#008445" }}
          inputStyle={{ color: "#f4a197" }}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: "#6b6b6b" }]}>
        <Text style={styles.title}>Hideo</Text>
        <Hideo
          iconClass={FontAwesomeIcon}
          iconName={"envelope"}
          iconColor={"white"}
          iconBackgroundColor={"#f2a59d"}
          inputStyle={{ color: "#464949" }}
          iconSize={30}
        />
        <Hideo
          style={styles.input}
          iconClass={FontAwesomeIcon}
          iconName={"user"}
          iconColor={"white"}
          iconBackgroundColor={"#f2a59d"}
          inputStyle={{ color: "#464949" }}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: "#b792a6" }]}>
        <Text style={styles.title}>Kohana</Text>
        <Kohana
          style={{ backgroundColor: "#f9f5ed" }}
          label={"Line"}
          iconClass={FontAwesomeIcon}
          iconName={"bus"}
          iconColor={"#f4d29a"}
          iconSize={40}
          labelStyle={{ marginTop: 8, color: "#91627b" }}
          inputStyle={{ color: "#91627b" }}
          useNativeDriver
        />
        <Kohana
          style={[styles.input, { backgroundColor: "#f9f5ed" }]}
          label={"Phone"}
          iconClass={FontAwesomeIcon}
          iconName={"phone"}
          iconColor={"#f4d29a"}
          labelStyle={{ color: "#91627b" }}
          inputStyle={{ color: "#91627b" }}
          useNativeDriver
        />
      </View>
      <View style={[styles.card2, { backgroundColor: "#d0efe0" }]}>
        <Text style={styles.title}>Makiko</Text>
        <Makiko
          label={"Destination"}
          iconClass={FontAwesomeIcon}
          iconName={"heart"}
          iconColor={"white"}
          iconSize={35}
          inputStyle={{ color: "#db786d" }}
        />
        <Makiko
          style={styles.input}
          label={"Comment"}
          iconClass={FontAwesomeIcon}
          iconName={"comment"}
          iconColor={"white"}
          inputStyle={{ color: "#db786d" }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "white",
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#404d5b",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8,
  },
});

export default App;
