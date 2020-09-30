import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

import { API } from '../../misc/apiCalls';
import { DeepBlue } from '../../constants/Colors';
import TourneyCard from '../UI/TourneyCard';
import SimpleButton from '../UI/SimpleButton';
import Header from '../UI/Header';
import PopUp from '../UI/PopUp';
import * as tourneyActions from '../../store/actions/tournaments';
import * as TCActions from '../../store/actions/tourneycards';
import * as UDActions from '../../store/actions/userdata';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TourneyListScreen = props => {

    const dispatch = useDispatch();

    const [showCards, setShowCards] = useState(false);
    const [joinTourneyModalVisible, setJoinTourneyModalVisible] = useState(false);

    const tourneys = useSelector(state => state.tournaments.userTournaments);
    const cards = useSelector(state => state.tourneycards.tourneyCards);

    // runs only first time dashboard is loaded
    // sets up permissions for push notifications
    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
            if(statusObj.status !== 'granted'){
                return Permissions.askAsync(Permissions.NOTIFICATIONS);
            }
            return statusObj;
        }).then(statusObj => {
            if(statusObj.status !== 'granted') {
                //TODO alert user that there will be no notifications shown...
                throw new Error('Permission not granted');
            }
        }).then(() => {
            //sign up with expo's push servers
            console.log("getting token...")
            return Notifications.getExpoPushTokenAsync();
        }).then(response => {
            console.log(response);
            const token = response.data;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }, []);

    // this goes to whichever is the first screen loaded to the user
    // loads userData and sets up tourney cards (local db)
    useEffect(() => {
        //TODO chain these actions, have a loading animation until it's complete

        dispatch(UDActions.setUserData()); // fetching userData (apikeys)
        
        //TODO FOR all userData apikeys -> search for user owned tournaments
        //TODO IF these user owned tournaments are not already in tourney cards -> INSERT new tourneycard rows in local db

        dispatch(TCActions.setTourneyCards()); // fetching tourney cards from local db

        //TODO stop loading animation
    }, [dispatch])

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
                alignItems: 'stretch',
                width: '100%'
            },
            textinput: {
                height: 97 * ratio, 
                color: DeepBlue.text_primary,
                borderColor: DeepBlue.bg_tertiary,
                borderBottomWidth: 3,
            },
            loadTourneyButton: {
                marginTop: 25 * ratio,
            },
            playerListView: {
                padding: 25 * ratio,
                marginTop: 25 * ratio,
                height: '70%',
                width: '100%',
                alignItems: 'stretch',
                borderRadius: 25 * ratio,
                backgroundColor: DeepBlue.bg_secondary
            },
            listHeaderText: {
                fontFamily: 'prototype',
                color: DeepBlue.text_secondary,
                marginVertical: 10 * ratio
            },
            separator: {
                height: 2,
                backgroundColor: DeepBlue.primary
            },
            listItem: {
                marginVertical: 25 * ratio
            },
            selectedItem: {
                backgroundColor: DeepBlue.primary,
            }
        });

        return (
            <PopUp
                visible={joinTourneyModalVisible} 
                isSecondaryButton={true}
                isSubtitle={true}
                onClose={() => {setJoinTourneyModalVisible(false)}}
                buttonText={selectedPlayer ? "Join as " + selectedPlayer.participant.name : "Join"}
                buttonColor={DeepBlue.accent}
                buttonOpacity={selectedPlayer ? 1 : 0.2}
                onPress={selectedPlayer ? 
                    () => {
                        dispatch(tourneyActions.createTourney(urlText, players, selectedPlayer))
                        .then(res => {
                            console.log(res)
                            dispatch(TCActions.createTourneyCard(res, urlText, selectedPlayer)).then(() => {
                                setJoinTourneyModalVisible(false);
                            }).catch(err => {
                                console.log("!! My Tourneys - tourney card creation failed")
                                throw err;
                            });
                        }).catch(err => {
                            console.log("!! My Tourneys - tourney creation failed")
                            throw err;
                        });
                    } : 
                    () => {}}
                secondaryButtonText={"Cancel"}
                secondaryOnPress={() => {setJoinTourneyModalVisible(false)}}
                topFlex={0.1}
                contentFlex={100}
                bottomFlex={0.1}
                title={"Join as Player"}
                subtitle={"Enter a Challonge URL below:"}>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', width: dims.width * 0.7}}>
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
                                    if(result){
                                        setSelectedPlayer(null);
                                        setShowErrorMessage(false);
                                        setPlayers(result.payloadData.players);
                                        setShowPlayers(true);
                                    }else{
                                        setSelectedPlayer(null)
                                        setShowErrorMessage(true);
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
                                            <Text style={{fontFamily: 'prototype', color: itemData.item === selectedPlayer ? DeepBlue.bg_primary : DeepBlue.text_primary, marginLeft: (itemData.item === selectedPlayer ?  72 : 36) * ratio}}>
                                                {itemData.item.participant.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                        </View>}
                        {showErrorMessage && <Text style={itc_styles.listHeaderText}>No results!</Text>}
                    </View>
                </View>
            </PopUp>
        );
    }

    
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ImportTourneyContent/>
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
                        onPress={() => {setJoinTourneyModalVisible(true)}
                        }>
                        Add a tournament!
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