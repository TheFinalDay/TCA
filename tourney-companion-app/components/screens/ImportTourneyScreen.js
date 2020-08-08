import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, FlatList, TextInput, Platform} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import * as tourneyActions from '../../store/actions/tournaments';

// test bracket url: https://challonge.com/picfs9jq

const ImportTourneyScreen = props => {

    // TODO - IN ORDER:
    // - user selects player with dropdown list
    // - switch to dashboard and do all the GET requests for the bracket there...

    const dispatch = useDispatch();

    const [urlText, onChangeUrlText] = useState('');
    const [players, setPlayers] = useState([]);
    const [showPlayers, setShowPlayers] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const tourneys = useSelector(state => state.tournaments.userTournaments);
    const mostRecentTourneyUrl = useSelector(state => state.tournaments.mostRecentUrl);
    const is404 = useSelector(state => state.errors.isTournamentUrlNotFound);

    useEffect(() => {
        
        // make sure the tourney was really added:
        let tourneysArray = Object.keys(tourneys).map((key) => [Number(key), tourneys[key]]);
        let tIndex = tourneysArray.findIndex(x => x[1].url == mostRecentTourneyUrl);
        if(tIndex >= 0){
            console.log("mostRecenturl = "+ mostRecentTourneyUrl);
            console.log("index = " + tIndex);
            console.log(tourneysArray.length + " tournaments");
            setPlayers(tourneysArray[tIndex][1].players);
            setShowPlayers(true);
        }
    },[tourneys]);

    useEffect(() => {
        setShowErrorMessage(false);
        if(is404){
            setShowErrorMessage(is404);
        }
    });

    return(
        <View>
            <Text style={styles.enterUrlText}>Enter a Challonge URL:</Text>
            <View>
                <TextInput
                    style={styles.textinput}
                    placeholder="i.e.: challonge.com/example123"
                    onChangeText={text => onChangeUrlText(text)}
                    value={urlText}
                />
                <View style={styles.loadTourneyButton}>
                    <Button 
                        color={DeepBlue.primary}
                        title="Load Tourney"
                        onPress={() => {
                            dispatch(tourneyActions.createTourney(urlText));
                            if (mostRecentTourneyUrl != urlText) {
                                setShowPlayers(false);
                            }
                        }}
                    />
                </View>
            </View>
            <View style={styles.playerListView}>
                {showPlayers && <FlatList
                    ListHeaderComponent={<Text style={styles.listHeaderText}>Found {players.length} players:</Text>}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    data={players}
                    keyExtractor={player => player.participant.id.toString()}
                    renderItem={itemData => 
                        <View style={styles.listItem}>
                            <Text style={{fontFamily: 'prototype'}}>
                                {itemData.item.participant.name}
                            </Text>
                        </View>
                        
                    }
                />}
                {showErrorMessage && <Text style={styles.listHeaderText}>No results!</Text>}
            </View>
            
        </View>
    );
}

ImportTourneyScreen.navigationOptions = { }

const styles = StyleSheet.create({
    enterUrlText: {
        fontFamily: 'prototype',
        marginLeft: 10,
        marginVertical: 4
    },
    loadTourneyButton: {
        marginLeft: 10,
        marginVertical: 4,
        width: '90%'
    },
    textinput: {
        height: 40, 
        borderColor: DeepBlue.text_secondary,
        borderBottomWidth: 2,
        marginLeft: 10,
        marginBottom: 4,
        width: '90%',
    },
    playerListView: {
        height: '50%'
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: DeepBlue.text_secondary,
        marginLeft: 15,
        marginVertical: 4
    },
    listHeaderText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        marginVertical: 3,
        marginLeft: 10
    },
    listItem: {
        marginLeft: 15
    }
});

export default ImportTourneyScreen;