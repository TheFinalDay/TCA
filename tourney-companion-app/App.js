import React from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import Header from './components/misc/Header';
import * as Font from 'expo-font';

/*
export default function App() {

  return (
    <View style={styles.screen}>
      <Header title="Dashboard"></Header>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
*/

export default class App extends React.Component {

  state = {
    assetsLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'prototype': require('./assets/fonts/Prototype.ttf')
    });

    this.setState({ assetsLoaded: true });
  }

  render() {

    const {assetsLoaded} = this.state;

    if( assetsLoaded ) {
      return (
        <View style={styles.screen}>
          <Header title="Dashboard"></Header>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});

