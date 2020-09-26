import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import TourneyCard from '../UI/TourneyCard';
import SimpleButton from '../UI/SimpleButton';
import Header from '../UI/Header';
import * as tourneyActions from '../../store/actions/tournaments';
import * as TCActions from '../../store/actions/tourneycards';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TourneyListScreen = props => {

    const dispatch = useDispatch();

    const [showCards, setShowCards] = useState(false);

    const tourneys = useSelector(state => state.tournaments.userTournaments);
    const cards = useSelector(state => state.tourneycards.tourneyCards);

    useEffect(() => {

        

    },[tourneys]);

    useEffect(() => {

        setShowCards(cards.length > 0 ? true : false);

    }, [cards])

    

    return (
        <View style={styles.screen}>
            <Header openDrawer={props.navigation.openDrawer}>My Tourneys</Header>
            {showCards && <View style={styles.tourneyListView}>
                <FlatList
                    data={cards}
                    keyExtractor={card => card.tid.toString()}
                    renderItem={itemData => 
                        <TourneyCard 
                            onRemove={() => {
                                console.log("Deleting "+itemData.item.tname);
                                dispatch(TCActions.deleteTourneyCard(itemData.item.tid))
                                    .then(() => {
                                        dispatch(tourneyActions.deleteTourney(itemData.item.tid));
                                    }).catch(err => {
                                        console.log("!! tourneyCard deletion failed");
                                        throw err;
                                    });
                            }} 
                            tourney={itemData.item} 
                            navigation={props.navigation}
                        />
                    }
                />
            </View>}
            {!showCards && <View style={styles.emptySection}>
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
        height: dims.height * 0.92,
        width: '100%'
    },
    emptySection: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessage:{
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        marginTop: 25 * ratio,
        marginLeft: 25 * ratio
    },
    joinTourneyButton: {
        marginTop: 25 * ratio,
        width: '50%',
    }
});

export default TourneyListScreen;