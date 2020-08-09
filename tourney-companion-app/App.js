import React from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import MainNavigator from './navigation/drawers/MainNavigator';
import store from './store/store';
import { DeepBlue } from './constants/Colors';



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
        <Provider store={store}>
          <MainNavigator/>
        </Provider>
      );
    }
    else {
      return (
        <View style={styles.screenLoading}>
          <ActivityIndicator/>
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  screenLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});



