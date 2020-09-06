import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { DeepBlue } from '../../constants/Colors';
import Header from '../UI/Header';


const TOAccountScreen = props => {

    const UserAccountItem = props => {
        
        return(
            <Text color={DeepBlue.bg_secondary}>placeholder</Text>
        );
    }


    return(
        <View style={styles.screen}>
            <Header openDrawer={props.navigation.openDrawer}>T.O. Accounts</Header>
            <Text style={{color: DeepBlue.primary_light}}>TO Accounts Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon!</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: DeepBlue.bg_primary
    }
});

export default TOAccountScreen;