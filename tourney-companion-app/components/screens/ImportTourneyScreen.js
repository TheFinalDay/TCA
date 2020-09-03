import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, FlatList, TextInput, Platform} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { API } from '../../misc/apiCalls';
import { DeepBlue } from '../../constants/Colors';
import SimpleButton from '../UI/SimpleButton';
import Header from '../UI/Header';
import * as tourneyActions from '../../store/actions/tournaments';

const dims = Dimensions.get('window');

const ImportTourneyScreen = props => {

    const dispatch = useDispatch();

    const [urlText, onChangeUrlText] = useState('');
    const [players, setPlayers] = useState([]);
    const [showPlayers, setShowPlayers] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const tourneys = useSelector(state => state.tournaments.userTournaments);

    useEffect(() => {
        
        if(selectedPlayer){
            props.navigation.navigate('TourneyList');
            onChangeUrlText('');
            setPlayers([]);
            setShowPlayers(false);
            setSelectedPlayer(null);
        }

    },[tourneys]);

    

    return(
        <View style={styles.screen}>
            <Header openDrawer={props.navigation.openDrawer}>Join as Player</Header>
            <Text style={styles.enterUrlText}>Enter a Challonge URL :</Text>
            <View style={styles.textInputView}>
                <TextInput
                    style={styles.textinput}
                    placeholder="i.e.: challonge.com/example123"
                    placeholderTextColor={DeepBlue.text_secondary}
                    onChangeText={text => onChangeUrlText(text)}
                    value={urlText}
                />
                <SimpleButton 
                    style={styles.loadTourneyButton}
                    backgroundColor={DeepBlue.primary}
                    onPress={async () => {
                            setShowPlayers(false)
                            let result = await API._getPlayerList(urlText);
                            if(result){
                                setSelectedPlayer(null);
                                setShowErrorMessage(false);
                                setPlayers(result.payloadData.players);
                                setShowPlayers(true);
                            }else{
                                setShowErrorMessage(true);
                            }
                        }
                    }>
                    Load Tourney
                </SimpleButton>
            </View>
            <View style={styles.playerListView}>
                {showPlayers && <View>
                    <FlatList
                        ListHeaderComponent={<Text style={styles.listHeaderText}>Found {players.length} players:</Text>}
                        ItemSeparatorComponent={() => <View style={styles.separator}/>}
                        data={players}
                        extraData={selectedPlayer}
                        keyExtractor={player => player.participant.id.toString()}
                        renderItem={itemData => 
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelectedPlayer(itemData.item);
                                }}
                                style={itemData.item === selectedPlayer ? styles.selectedItem : null}>
                                <View style={styles.listItem}>
                                    <Text style={{fontFamily: 'prototype', color: DeepBlue.text_primary}}>
                                        {itemData.item.participant.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>}
                {showErrorMessage && <Text style={styles.listHeaderText}>No results!</Text>}
            </View>
            {selectedPlayer && <View style={styles.joinTourneyContainer}>
                <SimpleButton
                    style={styles.joinTourneyButton}
                    backgroundColor={DeepBlue.accent}
                    fontSize={14}
                    borderWidth={5}
                    borderColor={DeepBlue.text_primary}
                    onPress={async () => {
                        dispatch(tourneyActions.createTourney(urlText, players, selectedPlayer));
                    }}>
                    Join Tourney as <Text style={styles.buttonPlayerName}>{selectedPlayer ? selectedPlayer.participant.name : '     '}</Text>
                </SimpleButton>
            </View>}
        </View>
    );
}

ImportTourneyScreen.navigationOptions = { }

const styles = StyleSheet.create({
    screen: {
        backgroundColor: DeepBlue.bg_primary,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    textInputView: {
        width: "100%",
        alignItems: 'center'
    },
    enterUrlText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 3
    },
    loadTourneyButton: {
        marginTop: 4,
        marginBottom: 6,
        width: '95%',
    },
    buttonText:{
        fontFamily: 'prototype',
        textAlign: 'center',
        fontSize: 16
    },
    textinput: {
        height: 40, 
        color: DeepBlue.text_primary,
        borderColor: DeepBlue.text_secondary,
        borderBottomWidth: 2,
        marginBottom: 4,
        width: '95%',
    },
    playerListView: {
        height: dims.height * 0.65,
        width: '100%'
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: DeepBlue.text_secondary,
        marginLeft: 15
    },
    listHeaderText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary,
        marginVertical: 3,
        marginLeft: 10
    },
    listItem: {
        marginLeft: 15,
        marginVertical: 10
    },
    selectedItem: {
        backgroundColor: DeepBlue.bg_secondary,
        width: '90%',
        marginLeft: 15
    },
    joinTourneyContainer: {
        
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: dims.height * 0.25
    },
    joinTourneyButton: {
        width: '85%',
    },
    buttonPlayerName: {
        fontSize: 20,
        fontFamily: 'prototype'
    }
});

export default ImportTourneyScreen;