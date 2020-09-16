import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import RectangleIconButton from '../UI/RectangleIconButton';
import * as tourneyActions from '../../store/actions/tournaments';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TourneyCard = props => {

    // trash-can-outline
    // arrow-right-drop-circle-outline

    const dispatch = useDispatch();

    const { tournament } = props.tourney.tourneyData;
    const { participant } = props.tourney.userPlayer;

    const tourneyNameUppercase = (tournament.name + "").toLocaleUpperCase();

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <View style={{backgroundColor: DeepBlue.primary}}><Text style={styles.textTitle}>{tourneyNameUppercase}</Text></View>
                <View style={{...styles.categoryAndCount, backgroundColor: DeepBlue.bg_tertiary}}>
                    <Text style={{...styles.textPrimary, flex: 4}}>{tournament.game_name || tournament.category || "Miscellaneous"}</Text>
                    <Text style={{...styles.textSecondary, flex: 2, textAlign: 'right'}}>{tournament.participants_count} participants</Text>
                </View>
                <View style={styles.typeAndDate}>
                    <Text style={{...styles.textPrimary, flex: 1}}>{tournament.tournament_type}</Text>
                    <Text style={{...styles.textSecondary, flex: 1,  textAlign: 'right'}}>{new Date(tournament.started_at).toDateString()}</Text>
                </View>
                <Text style={styles.textPrimary}>Player: <Text  style={styles.accentText}>{participant.name}</Text></Text>
            </View>
            <View style={styles.buttons}>
                <RectangleIconButton
                    onPress={props.onRemove}
                    style={styles.removeButton}
                    iconName='trash-can-outline'
                    iconSize={25}
                    backgroundColor={DeepBlue.red}
                />
                <View style={{...styles.dashboardButton, borderLeftWidth: 3, borderColor: DeepBlue.primary}}>
                    <RectangleIconButton
                    onPress={() => {
                        dispatch(tourneyActions.activateTourney(props.tourney.tid));
                        props.navigation.navigate('CurrentTourney');
                    }}
                    iconName='arrow-right-drop-circle-outline'
                    iconSize={25}
                    fontSize={18}
                    backgroundColor={DeepBlue.accent}>
                    View Dashboard
                </RectangleIconButton>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    buttons: {
        height: 120 * ratio,
        flexDirection: 'row',
        borderTopWidth: 3,
        borderColor: DeepBlue.primary
    },
    removeButton: {
        flex: 1
    },
    removeText: {
        fontFamily: 'prototype',
        color: DeepBlue.red,
        fontSize: 14
    },
    dashboardButton: {
        flex: 5
    },
    accentText: {
        fontFamily: 'prototype',
        color: DeepBlue.accent,
        fontSize: 14
    },
    textTitle: {
        fontFamily: 'prototype',
        color: 'black',
        fontSize: 18,
        margin: 5,
        marginHorizontal: 7
    }, 
    textPrimary: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 14,
        margin: 3,
        marginHorizontal: 8
    },
    textSecondary: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        fontSize: 14,
        margin: 3,
        marginHorizontal: 8
    },
    card: {
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: DeepBlue.primary,
        overflow: 'hidden',
        backgroundColor: DeepBlue.bg_secondary,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }, 
    info: {

    },
    categoryAndCount:{
        flexDirection: 'row'
    },
    typeAndDate: {
        flexDirection: 'row'
    }
});

export default TourneyCard;