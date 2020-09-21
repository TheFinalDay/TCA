import React from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import MainNavigator from './navigation/drawers/MainNavigator';
import TopPaddingBar from './components/UI/TopPaddingBar';
import store from './store/store';
import { init, dropUserData } from './misc/db';


/*
// UNCOMMENT IF NECESSARY (TESTING)

dropUserData()
  .then(result => {
    console.log("Dropped userData");
  })
  .catch(err => {
    console.log('Dropping userData failed');
    console.log(err);
  });
*/


init()
  .then(() => {
    console.log('Initialized db');
  })
  .catch(err => {
    console.log('Initializing db failed');
    console.log(err);
  });

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
          <TopPaddingBar/>
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



