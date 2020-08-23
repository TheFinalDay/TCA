import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import TourneyCard from '../UI/TourneyCard';
import * as tourneyActions from '../../store/actions/tournaments';

const TourneyListScreen = props => {

    const dispatch = useDispatch();

    const tourneys = useSelector(state => state.tournaments.userTournaments);

    return (
        <View>
            <Text>TourneyListScreen</Text>
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
    );
}

const styles = StyleSheet.create({

});

export default TourneyListScreen;