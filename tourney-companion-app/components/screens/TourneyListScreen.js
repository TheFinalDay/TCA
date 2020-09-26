import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { API } from '../../misc/apiCalls';
import { DeepBlue } from '../../constants/Colors';
import TourneyCard from '../UI/TourneyCard';
import SimpleButton from '../UI/SimpleButton';
import Header from '../UI/Header';
import PopUp from '../UI/PopUp';
import * as tourneyActions from '../../store/actions/tournaments';
import * as TCActions from '../../store/actions/tourneycards';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TourneyListScreen = props => {

    const dispatch = useDispatch();

    const [showCards, setShowCards] = useState(false);
    const [joinTourneyModalVisible, setJoinTourneyModalVisible] = useState(false);

    

    const tourneys = useSelector(state => state.tournaments.userTournaments);
    const cards = useSelector(state => state.tourneycards.tourneyCards);

    useEffect(() => {

        

    },[tourneys]);

    useEffect(() => {

        setShowCards(cards.length > 0 ? true : false);

    }, [cards])

    const ImportTourneyContent = props => {

        const [urlText, onChangeUrlText] = useState('');
        const [players, setPlayers] = useState([]);
        const [showPlayers, setShowPlayers] = useState(false);
        const [showErrorMessage, setShowErrorMessage] = useState(false);
        const [selectedPlayer, setSelectedPlayer] = useState(null);

        // code here I guess..

        const itc_styles = StyleSheet.create({
            textInputView: {
                alignItems: 'center',
                width: '100%'
            },
            textinput: {
                height: 97 * ratio, 
                color: DeepBlue.text_primary,
                borderColor: DeepBlue.bg_tertiary,
                borderBottomWidth: 3,
                marginBottom: 10 * ratio,
            },
            loadTourneyButton: {
                marginTop: 10 * ratio,
                marginBottom: 14 * ratio,
            },
            playerListView: {
                height: dims.height * 0.65,
                width: '100%'
            },
            listHeaderText: {
                fontFamily: 'prototype',
                color: DeepBlue.text_secondary,
                marginVertical: 10 * ratio,
                marginLeft: 25 * ratio
            },
            separator: {
                height: 1,
                width: "90%",
                backgroundColor: DeepBlue.text_secondary,
                marginLeft: 36 * ratio
            },
            listItem: {
                marginLeft: 36 * ratio,
                marginVertical: 25 * ratio
            },
            selectedItem: {
                backgroundColor: DeepBlue.bg_secondary,
                width: '90%',
                marginLeft: 36 * ratio
            }
        });

        return (
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <View style={itc_styles.textInputView}>
                    <TextInput
                        style={itc_styles.textinput}
                        placeholder="i.e.: challonge.com/example123"
                        placeholderTextColor={DeepBlue.text_secondary}
                        onChangeText={text => onChangeUrlText(text)}
                        value={urlText}
                    />
                    <SimpleButton 
                        style={itc_styles.loadTourneyButton}
                        backgroundColor={DeepBlue.primary}
                        onPress={async () => {
                            setShowPlayers(false);
                            let result = await API._getPlayerList(urlText);
                                
                                console.log(result.payloadData);
                                if(result){
                                    setSelectedPlayer(null);
                                    setShowErrorMessage(false);
                                    setPlayers(result.payloadData.players);
                                    setShowPlayers(true);
                                }else{
                                    setSelectedPlayer(null);
                                    setShowErrorMessage(true);
                                    setPlayers([]);
                                }
                            }
                        }>
                        Load Players
                    </SimpleButton>
                </View>
                
                <View style={itc_styles.playerListView}>
                    {showPlayers && <View>
                        <FlatList
                            ListHeaderComponent={<Text style={itc_styles.listHeaderText}>Found {players.length} players:</Text>}
                            ItemSeparatorComponent={() => <View style={itc_styles.separator}/>}
                            data={players}
                            extraData={selectedPlayer}
                            keyExtractor={player => player.participant.id.toString()}
                            renderItem={itemData => 
                                <TouchableOpacity 
                                    onPress={() => {
                                        setSelectedPlayer(itemData.item);
                                    }}
                                    style={itemData.item === selectedPlayer ? itc_styles.selectedItem : null}>
                                    <View style={itc_styles.listItem}>
                                        <Text style={{fontFamily: 'prototype', color: DeepBlue.text_primary}}>
                                            {itemData.item.participant.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>}
                </View>
                
            </View>
        );
    }

    

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <PopUp
                visible={joinTourneyModalVisible} 
                isSecondaryButton={true}
                isSubtitle={true}
                onClose={() => {setJoinTourneyModalVisible(false)}}
                buttonText={"Join"}
                buttonColor={DeepBlue.primary}
                onPress={() => {}}
                secondaryButtonText={"Cancel"}
                secondaryOnPress={() => {setJoinTourneyModalVisible(false)}}
                topFlex={0.1}
                contentFlex={100}
                bottomFlex={0.1}
                title={"Join as Player"}
                subtitle={"Enter a Challonge URL below:"}>
                    <ImportTourneyContent/>
                    
            </PopUp>
            <View style={styles.screen}>
                <Header 
                    openDrawer={props.navigation.openDrawer} 
                    headerRight=
                    {
                        <TouchableOpacity style={styles.drawerRightButton} onPress={() => {setJoinTourneyModalVisible(true)}}>
                            <MaterialCommunityIcons name={props.iconName || 'plus'} size={props.iconSize || 85 * ratio} color={props.iconColor || 'white'} />
                        </TouchableOpacity>
                    }>
                    My Tourneys
                </Header>
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
    },
    drawerRightButton: {
        marginRight: 36 * ratio,
    }
});

export default TourneyListScreen;