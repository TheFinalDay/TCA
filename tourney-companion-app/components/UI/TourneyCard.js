import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { DeepBlue } from '../../constants/Colors';

const TourneyCard = props => {

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <View style={{backgroundColor: DeepBlue.primary}}><Text style={styles.textTitle}>{props.tourney.tourneyData.tournament.name}</Text></View>
                <View style={{backgroundColor: DeepBlue.bg_tertiary}}>
                <Text style={styles.textPrimary}>{props.tourney.tourneyData.tournament.game_name || props.tourney.tourneyData.tournament.category}</Text>
                <Text style={styles.textSecondary}>{props.tourney.tourneyData.tournament.participants_count} players</Text>
                </View>
                <Text style={styles.textPrimary}>{props.tourney.tourneyData.tournament.tournament_type}</Text>
                <Text style={styles.textPrimary}>Registered as: <Text  style={styles.accentText}>{props.tourney.userPlayer.participant.name}</Text></Text>
                <Text style={styles.textSecondary}>{new Date(props.tourney.tourneyData.tournament.started_at).toDateString()}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={props.onRemove} style={styles.removeButton}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {props.navigation.navigate('CurrentTourney', { tourneyInfo: props.tourney })}} 
                    style={styles.dashboardButton}>
                    <Text style={styles.accentText}>View Dashboard</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    removeButton: {

    },
    removeText: {
        fontFamily: 'prototype',
        color: DeepBlue.red,
        fontSize: 14
    },
    dashboardButton: {

    },
    accentText: {
        fontFamily: 'prototype',
        color: DeepBlue.accent,
        fontSize: 14
    },
    textTitle: {
        fontFamily: 'prototype',
        color: 'black',
        fontSize: 18
    }, 
    textPrimary: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 14
    },
    textSecondary: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        fontSize: 14
    },
    card: {
        padding: 10,
        backgroundColor: DeepBlue.bg_secondary,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }, 
    info: {

    }
});

export default TourneyCard;