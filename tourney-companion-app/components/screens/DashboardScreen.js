import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, BackHandler } from 'react-native';

import { DeepBlue } from '../../constants/Colors';
import DashboardHeader from '../UI/DashboardHeader';
import Banner from '../UI/Banner';
import { API } from '../../misc/apiCalls';



const DashboardScreen = props => {

    // TODO
    // Current match button
    // Calculate opponents and previsions...

    //const { tid, url, players, tourneyData, userPlayer } = props.navigation.dangerouslyGetParent().getParam('tourneyInfo');

    [matches, setMatches] = useState(null);
    [isLoading, setIsLoading] = useState(true);

    const tourney = useSelector(state => state.tournaments.activeTournament);

    
    useEffect(() => {
        // runs only the first time the dashboard is loaded, and when switching dashboards
        if(tourney){
            setIsLoading(true);
            API._getMatchList(tourney.url).then(result => {
                setMatches(result.payloadData.matches);
                setIsLoading(false);
            });
        }
        
    }, [tourney]);



    return(

        <View style={styles.screen}>
            <DashboardHeader openDrawer={props.navigation.openDrawer}>{tourney?.tourneyData.tournament.name || "Nothing here!"}</DashboardHeader>
            {tourney && <View style={styles.dashboard}>

                <View style={styles.currentmatch}>
                    <Banner color={DeepBlue.bg_secondary}>Helloooo</Banner>
                    <Text style={{...styles.text, color: DeepBlue.text_secondary}}><Text>0W</Text> - <Text>0L</Text></Text>
                    

                    {!isLoading ? 

                        <Text style={{...styles.text, color: DeepBlue.text_primary}}>number of matches: {matches.length}</Text>
                        : 
                        <Text style={styles.loadingtext}>number of matches:   </Text>
                    }
                    
                    <Text style={{...styles.text, color: DeepBlue.text_primary}}>match state: ...</Text>
                </View>
                

                <View>
                    <Text style={{...styles.text, color: DeepBlue.text_secondary}}>Player: {tourney.userPlayer.participant.name}</Text>
                    <Text style={{...styles.text, color: DeepBlue.primary}}>{tourney.players.length} players</Text>
                    <Text style={{...styles.text, color: DeepBlue.primary}}>URL: {tourney.url}</Text>
                    <Text style={{...styles.text, color: DeepBlue.accent}}>{tourney.tid}</Text>
                </View>
                
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
    loadingtext: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary
    },
    currentmatch: {
        margin: 10
    }
});


export default DashboardScreen;