import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, BackHandler } from 'react-native';

import { DeepBlue } from '../../constants/Colors';



const DashboardScreen = props => {

    // TODO
    // Screen needs to update if switching between multiple tourneys
    // Screen needs to display a "nothing here!" message if no tourney has been selected (not necessary if not accessible from drawer)
    // Go Back button needs to navigate to tourney list
    // Calculate opponents and previsions...

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                props.navigation.navigate('TourneyList');
            };
    
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const { tid, url, players, tourneyData, userPlayer } = props.navigation.dangerouslyGetParent().getParam('tourneyInfo');

    return(
        <View style={styles.screen}>
            <Text style={{...styles.text, color: DeepBlue.text_primary}}>{tourneyData.tournament.name}</Text>
            <Text style={{...styles.text3, color: DeepBlue.text_secondary}}>Player: {userPlayer.participant.name}</Text>
            <Text style={{...styles.text1, color: DeepBlue.primary}}>{players.length} players</Text>
            <Text style={{...styles.text1, color: DeepBlue.primary}}>URL: {url}</Text>
            <Text style={{...styles.text2, color: DeepBlue.accent}}>{tid}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    },
    text: {
        fontFamily: 'prototype'
    },
    text1: {
        fontFamily: 'prototype'
    },
    text2: {
        fontFamily: 'prototype'
    },
    text3: {
        fontFamily: 'prototype'
    }
});


export default DashboardScreen;