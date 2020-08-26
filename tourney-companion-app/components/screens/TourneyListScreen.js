import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import TourneyCard from '../UI/TourneyCard';
import SimpleButton from '../UI/SimpleButton';
import Header from '../UI/Header';
import * as tourneyActions from '../../store/actions/tournaments';

const dims = Dimensions.get('window');

const TourneyListScreen = props => {

    const dispatch = useDispatch();

    const [showTourneys, setShowTourneys] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(true);

    const tourneys = useSelector(state => state.tournaments.userTournaments);

    useEffect(() => {

        setShowTourneys(tourneys.length > 0 ? true : false);
        setShowErrorMessage(tourneys.length > 0 ? false : true);

    },[tourneys]);

    return (
        <View style={styles.screen}>
            <Header openDrawer={props.navigation.openDrawer}>My Tourneys</Header>
            {showTourneys && <View style={styles.tourneyListView}>
                <FlatList
                    data={tourneys}
                    keyExtractor={tourney => tourney.tid.toString()}
                    renderItem={itemData => 
                        <TourneyCard 
                            onRemove={() => {
                                dispatch(tourneyActions.deleteTourney(itemData.item.tourneyData.tournament.id));
                            }} 
                            tourney={itemData.item} 
                            navigation={props.navigation}
                        />
                    }
                />
            </View>}
            {showErrorMessage && <View style={styles.emptySection}>
                <Text style={styles.errorMessage}>Your list of tournaments is empty...</Text>
                <SimpleButton 
                    style={styles.joinTourneyButton}
                    backgroundColor={DeepBlue.bg_tertiary}
                    onPress={() => {
                            props.navigation.navigate("Import");
                        }
                    }>
                    Go join some!
                </SimpleButton>
            </View>}
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: DeepBlue.bg_primary
    },
    tourneyListView: {
        height: dims.height * 0.85,
        width: '100%'
    },
    emptySection: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessage:{
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        marginTop: 10,
        marginLeft: 10
    },
    joinTourneyButton: {
        marginTop: 10,
        width: '50%',
    }
});

export default TourneyListScreen;