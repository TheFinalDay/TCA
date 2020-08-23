import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import TourneyCard from '../UI/TourneyCard';
import Header from '../UI/Header';
import * as tourneyActions from '../../store/actions/tournaments';

const dims = Dimensions.get('window');

const TourneyListScreen = props => {

    //TODO
    // styling

    const dispatch = useDispatch();

    const tourneys = useSelector(state => state.tournaments.userTournaments);

    return (
        <View style={styles.screen}>
            <Header openDrawer={props.navigation.openDrawer}>List of Tourneys</Header>
            <View style={styles.tourneyListView}>
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
            </View>
            
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
    }
});

export default TourneyListScreen;