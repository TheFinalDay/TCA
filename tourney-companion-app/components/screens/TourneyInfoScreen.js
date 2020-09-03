import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';
import SimpleButton from '../UI/SimpleButton';
import { API } from '../../misc/apiCalls';

const TourneyInfoScreen = props => {

    const tourney = useSelector(state => state.tournaments.activeTournament);


    return(
        <View style={styles.screen}>
            <Text style={{color: DeepBlue.primary_light}}>Tourney Info Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon, but not that soon ya know!</Text>
            <SimpleButton onPress={() => {
                if(tourney){
                    API._registerTourney(tourney.tid).then(result => {
                        console.log("id: "+result.payloadData.id +"& tid: "+result.payloadData.tid);
                    });
                }
            }}>Register tourney in DB</SimpleButton>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    }
});

export default TourneyInfoScreen;