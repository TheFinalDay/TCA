import React, { useState } from 'react';
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

    const [isLoading, setIsLoading] = useState(false);

    const { tourney } = props;

    const tourneyNameUppercase = (tourney.tname + "").toLocaleUpperCase();

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <View style={{backgroundColor: DeepBlue.primary}}><Text style={styles.textTitle}>{tourneyNameUppercase}</Text></View>
                <View style={{...styles.categoryAndCount, backgroundColor: DeepBlue.bg_tertiary}}>
                    <Text style={{...styles.textPrimary, flex: 4}}>{tourney.tgame}</Text>
                    <Text style={{...styles.textSecondary, flex: 2, textAlign: 'right'}}>{tourney.tplayers} participants</Text>
                </View>
                <View style={styles.typeAndDate}>
                    <Text style={{...styles.textPrimary, flex: 1}}>{tourney.ttype}</Text>
                    <Text style={{...styles.textSecondary, flex: 1,  textAlign: 'right'}}>{tourney.tdate}</Text>
                </View>
                <Text style={styles.textPrimary}>Player: <Text  style={styles.accentText}>{tourney.pname}</Text></Text>
            </View>
            <View style={styles.buttons}>
                <RectangleIconButton
                    onPress={props.onRemove}
                    style={styles.removeButton}
                    iconName='trash-can-outline'
                    iconSize={85 * ratio}
                    iconColor={DeepBlue.text_primary}
                    backgroundColor={DeepBlue.red}
                />
                <View style={{...styles.dashboardButton, borderLeftWidth: 3, borderColor: DeepBlue.primary}}>
                    <RectangleIconButton
                    onPress={() => {
                        setIsLoading(true);
                        dispatch(tourneyActions.activateTourney(tourney.tid, tourney.url, tourney.pid)).then(() => {
                            props.navigation.navigate('CurrentTourney');
                            setIsLoading(false);
                        });
                    }}
                    iconName='arrow-right-drop-circle-outline'
                    iconSize={85 * ratio}
                    fontSize={47 * ratio}
                    textColor={DeepBlue.text_primary}
                    iconColor={DeepBlue.text_primary}
                    backgroundColor={isLoading ? DeepBlue.text_secondary : DeepBlue.accent}>
                    {isLoading ? "Loading...   " : "View Dashboard"}
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
        fontSize: 34 * ratio
    },
    dashboardButton: {
        flex: 5
    },
    accentText: {
        fontFamily: 'prototype',
        color: DeepBlue.accent,
        fontSize: 34 * ratio
    },
    textTitle: {
        fontFamily: 'prototype',
        color: 'black',
        fontSize: 43 * ratio,
        margin: 12 * ratio,
        marginHorizontal: 17 * ratio
    }, 
    textPrimary: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 34 * ratio,
        margin: 10 * ratio,
        marginHorizontal: 19 * ratio
    },
    textSecondary: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        fontSize: 34 * ratio,
        margin: 10 * ratio,
        marginHorizontal: 19 * ratio
    },
    card: {
        marginHorizontal: 25 * ratio,
        marginTop: 25 * ratio,
        borderRadius: 47 * ratio,
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