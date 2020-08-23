import React from 'react';
import { useSelector } from "react-redux";
import { Text, StyleSheet, View } from 'react-native';

import { DeepBlue } from '../../constants/Colors';



const DashboardScreen = props => {

    const { tid, url, players, tourneyData, userPlayer } = props.navigation.dangerouslyGetParent().getParam('tourneyInfo');

    return(
        <View style={{...styles.screen, backgroundColor: DeepBlue.bg_primary}}>
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
        alignItems: 'center'
        
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