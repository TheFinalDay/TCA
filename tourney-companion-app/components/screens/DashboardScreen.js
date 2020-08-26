import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, BackHandler } from 'react-native';

import { DeepBlue } from '../../constants/Colors';
import DashboardHeader from '../UI/DashboardHeader';



const DashboardScreen = props => {

    // TODO
    // Calculate opponents and previsions...

    //const { tid, url, players, tourneyData, userPlayer } = props.navigation.dangerouslyGetParent().getParam('tourneyInfo');

    const tourney = useSelector(state => state.tournaments.activeTournament);

    return(

        <View style={styles.screen}>
            <DashboardHeader openDrawer={props.navigation.openDrawer}>{tourney?.tourneyData.tournament.name || "Nothing here!"}</DashboardHeader>
            {tourney && <View style={styles.dashboard}>
                <Text style={{...styles.text, color: DeepBlue.text_primary}}>{tourney.tourneyData.tournament.name}</Text>
                <Text style={{...styles.text3, color: DeepBlue.text_secondary}}>Player: {tourney.userPlayer.participant.name}</Text>
                <Text style={{...styles.text1, color: DeepBlue.primary}}>{tourney.players.length} players</Text>
                <Text style={{...styles.text1, color: DeepBlue.primary}}>URL: {tourney.url}</Text>
                <Text style={{...styles.text2, color: DeepBlue.accent}}>{tourney.tid}</Text>
            </View>}
        </View>
        
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    },
    dashboard: {
        height: '100%',
        width: '100%',
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