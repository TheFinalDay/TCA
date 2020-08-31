import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';
import DashboardHeader from '../UI/DashboardHeader';
import Banner from '../UI/Banner';
import { API } from '../../misc/apiCalls';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const DashboardScreen = props => {

    // TODO
    // Current match button styling
    // Calculate previsions...
    // Different dashboard look when tourney is completed, ScoreText should display final scores

    //#region states/redux

    [matches, setMatches] = useState(null);

    // Current match related states
    [opponent, setOpponent] = useState(null);
    [cumulativeScores, setCumulativeScores] = useState([]);
    [currentMatchState, setCurrentMatchState] = useState(null);
    [currentMatchRound, setCurrentMatchRound] = useState(null);

    [isLoading, setIsLoading] = useState(true);
    [isTourneyComplete, setIsTourneyComplete] = useState(false);

    [playerId, setPlayerId] = useState(null);
    
    const tourney = useSelector(state => state.tournaments.activeTournament);

    //#endregion

    //#region hooks

    // runs only on first mount...
    useEffect(() => {
        
        // runs only on every unmount...
        return () => {
          // cleaning up states...
          setMatches(null);
          setOpponent(null);
          setCumulativeScores([]);
          setCurrentMatchState(null);
          setCurrentMatchRound(null);
          setIsLoading(true);
          setIsTourneyComplete(false);
          setPlayerId(null);
        }
    }, []);
    
    // runs only the first time the dashboard is loaded, and when switching dashboards
    useEffect(() => {
        
        if(tourney){
            setIsLoading(true);
            setPlayerId(tourney.userPlayer.participant.id);
            setIsTourneyComplete(tourney.tourneyData.tournament.state == 'complete');
            API._getMatchList(tourney.url).then(result => {
                setMatches(result.payloadData.matches);
                setOpponent(getOpponentData());
                setCumulativeScores([getWinsLosses(true), getWinsLosses(false)]);
                setCurrentMatchState(getMatchState());
                setCurrentMatchRound(getMatchRound());
                setIsLoading(false);
            });
        }
        
    }, [tourney]);

    //#endregion

    //#region components

    // Displays score text in color or grayed out depending on score
    const ScoreText = props => {

        if(cumulativeScores.length > 0){
            const wins = cumulativeScores[0];
            const losses = cumulativeScores[1];

            if(wins > 0){
                if(losses > 0){
                    // both scores coloured
                    return(
                        <Text style={styles.loadingtext}>
                            <Text style={{...styles.text, color: DeepBlue.accent}}>{wins}W</Text> - <Text style={{...styles.text, color: DeepBlue.red}}>{losses}L</Text>
                        </Text>
                    );
                } else {
                    // only wins coloured
                    return(
                        <Text style={styles.loadingtext}>
                            <Text style={{...styles.text, color: DeepBlue.accent}}>{wins}W</Text> - <Text style={styles.loadingtext}>0L</Text>
                        </Text>
                    );
                }
            } else {
                if(losses > 0){
                    // only losses coloured
                    return(
                        <Text style={styles.loadingtext}>
                            <Text style={styles.loadingtext}>0W</Text> - <Text style={{...styles.text, color: DeepBlue.red}}>{losses}L</Text>
                        </Text>
                    );
                } else {
                    // both scores grayed out
                    return(
                        <Text style={styles.loadingtext}>
                            <Text style={styles.loadingtext}>0W</Text> - <Text style={styles.loadingtext}>0L</Text>
                        </Text>
                    );
                }
            }
        }
        return <Text style={styles.loadingtext}>Tournament complete</Text>

    }

    // Displays current opponent data
    const OpponentText = props => {

        const { style } = props;

        if(opponent){

            const { names, state, isWinner } = opponent.data;

            if(state == "open"){// just display opponent name
                return(
                    <View style={{...style, flexDirection: 'row', alignItems: 'flex-start', padding: 5}}>
                        <Text style={{...styles.text, color: DeepBlue.text_primary}}>VS  </Text>
                        <Text numberOfLines={1} style={styles.opponent_text}>{names[0]}</Text>
                    </View>
                );
            } else {
                switch(names.length){
                    case 2:// display pending set with both names
                        return(
                            <View style={{...style, alignItems: 'flex-start', padding: 5}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{...styles.text, color: DeepBlue.text_primary}}>{isWinner ? "Winner" : "Loser"} of </Text>
                                    <Text style={styles.pending_opponent_text}>{names[0]}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: (isWinner ? 88 : 75) * ratio}}>
                                    <Text style={{...styles.text, color: DeepBlue.text_primary}}> and </Text>
                                    <Text style={styles.pending_opponent_text}>{names[1]}</Text>
                                </View>
                            </View>
                        );
                    case 1:// display pending set opponent 'and winner of earlier rounds...'
                        return(
                            <View style={{...style, alignItems: 'flex-start', padding: 5}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{...styles.text, color: DeepBlue.text_primary}}>Waiting for  </Text>
                                    <Text numberOfLines={1} style={styles.pending_opponent_text}>{names[0]}</Text>
                                </View>
                                <Text style={{...styles.text, color: DeepBlue.text_primary}}>and earlier rounds...</Text>
                            </View>
                        );
                    default:// display 'waiting for more than one pending round...'
                        return(
                            <View style={{...style, alignItems: 'flex-start', padding: 5}}>
                                <Text style={{...styles.text, color: DeepBlue.text_primary}}>Waiting for  </Text>
                                <Text style={styles.pending_rounds_text}>multiple earlier rounds...</Text>
                            </View>
                        );
                }
            }
        }
        return <Text style={{...style, ...styles.loadingtext}}>No more opponents</Text>
    }

    // Displays current match's state
    const MatchStateText = props => {
        if(currentMatchState){
            if(currentMatchState != 'completed'){
                if(currentMatchState == 'open'){
                    return(
                        <Text style={{...styles.text, color: DeepBlue.text_primary, padding: 5}}>Status: <Text style={{color: DeepBlue.accent}}>Ready</Text></Text>
                    );
                } else {
                    return(
                        <Text style={{...styles.text, color: DeepBlue.text_primary, padding: 5}}>Status: <Text style={{color: DeepBlue.text_secondary}}>Pending</Text></Text>
                    );
                }
                
            } else {
                return(
                    <Text style={styles.loadingtext}>State: N/A</Text>
                );
            }
        }
        return;
    }

    // Displays current match's round
    const MatchRoundText = props => {
        if(currentMatchRound){
            if(currentMatchRound != 'completed'){
                return(
                    <Banner color={DeepBlue.bg_secondary}>{currentMatchRound}</Banner>
                );
            } else {
                return(
                    <Banner color={DeepBlue.bg_secondary}>Tourney Completed</Banner>
                );
            }
        }
        return;
    }

    //#endregion

    //#region functions

    // finding the player's match which state is either open or pending
    function getCurrentMatch() {
        
        return matches.find(o => 
            (o.match.state == 'open' || o.match.state == 'pending')
            && (o.match.player1_id == playerId || o.match.player2_id == playerId)
        );
    }

    // finding the player's matches (any state)
    function getPlayerMatches() {
        return matches.filter(o =>
            (o.match.player1_id == playerId || o.match.player2_id == playerId)
        );
    }

    // returns the current match state
    const getMatchState = () => {
        if(!isTourneyComplete){
            if(matches){
                let current = getCurrentMatch();
                if(current){
                    return current.match.state;
                }
                // current undefined
                return;
            }
            // matches not loaded yet
            return;
        }
        //TODO remove this
        return "completed";
    }

    // returns the current match round
    const getMatchRound = () => {
        if(!isTourneyComplete){
            if(matches){
                let current = getCurrentMatch();
                if(current){
                    let round = current.match.round;
                    return (round < 0) ? "Losers Round " + Math.abs(round) : "Winners Round " + round;
                }
                // current undefined
                return;
            }
            // matches not loaded yet
            return;
        }
        //TODO remove this
        return "completed";
    }

    // returns the current win or lose scores
    const getWinsLosses = (isWins) => {
        if(!isTourneyComplete){
            if(matches){
                let numberOfMatches = getPlayerMatches().length;
                let current = getCurrentMatch();
                if(current){
                    let round = current.match.round;
                    if(round > 0){
                        if(isWins){
                            return (numberOfMatches - 1);
                        } else {
                            return "0";
                        }
                    } else {
                        if(isWins){
                            return (numberOfMatches - 2);
                        } else {
                            return "1";
                        }
                    }
                }
                // current undefined
                return;
            }
            // matches not loaded yet
            return;
        }
        //TODO remove this
        return;
    }

    // returns the current opponent(s) data
    const getOpponentData = () => {
        if(!isTourneyComplete){
            if(matches){
                let current = getCurrentMatch();
                if(current){

                    if(current.match.state == 'open'){ // player 2 already decided
                        let opponentId = (current.match.player1_id == playerId) ? current.match.player2_id : current.match.player1_id;
                        let opponent = tourney.players.find(player => (player.participant.id == opponentId));
                        setOpponent(opponent);
                        return {
                            data: {
                                names: [opponent.participant.name],
                                state: "open",
                                isWinner: true
                            }
                        };

                    } else { // player 2 not decided yet
                        let pendingMatchId = (current.match.player1_id) ? current.match.player2_prereq_match_id : current.match.player1_prereq_match_id;
                        let pending = matches.find(match => (match.match.id == pendingMatchId));

                        // true = winners, false = losers
                        let currentSide = current.match.round > 0;
                        let pendingSide = pending.match.round > 0;

                        let opponent1Id = pending.match.player1_id;
                        let opponent2Id = pending.match.player2_id;

                        let opponent1 = null;
                        let opponent2 = null;
                        if(opponent1Id){
                            opponent1 = tourney.players.find(player => (player.participant.id == opponent1Id));
                        }
                        if(opponent2Id){
                            opponent2 = tourney.players.find(player => (player.participant.id == opponent2Id));
                        }
                        if(opponent1 || opponent2){
                            if(opponent1 && opponent2){
                                if(currentSide && pendingSide){
                                    return {
                                        data: {
                                            names: [opponent1.participant.name, opponent2.participant.name],
                                            state: "pending",
                                            isWinner: true
                                        }
                                    };
                                } else {
                                    return {
                                        data: {
                                            names: [opponent1.participant.name, opponent2.participant.name],
                                            state: "pending",
                                            isWinner: false
                                        }
                                    };
                                }
                                
                            } else {
                                return {
                                    data: {
                                        names: [(opponent1 ? opponent1 : opponent2).participant.name],
                                        state: "pending",
                                        isWinner: true
                                    }
                                };
                            }
                        }
                        return {
                            data: {
                                names: [],
                                state: "pending",
                                isWinner: true
                            }
                        };
                    }
                }
                // current undefined
                return;
            }
            // matches not loaded yet
            return;
        }
        return;
    }

    //#endregion

    return(

        <View style={styles.screen}>
            <DashboardHeader openDrawer={props.navigation.openDrawer} iconSize={85 * ratio} playerName={tourney?.userPlayer.participant.name || "No one"}>{tourney?.tourneyData.tournament.name || "Nothing here!"}</DashboardHeader>
            {tourney && <View style={styles.dashboard}>

                <View style={styles.currentmatch}>

                    <View style={styles.round_and_scores}>
                        {!isLoading ? 
                            <MatchRoundText/>
                            : 
                            <Banner color={DeepBlue.bg_secondary} textColor={DeepBlue.text_secondary}>loading...</Banner>
                        }
                        {!isLoading ? 
                            <ScoreText/>
                            : 
                            <Text style={styles.loadingtext}>loading...</Text>
                        }
                    </View>

                    <View style={styles.cm_card}>
                            {!isLoading ? 
                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <OpponentText style={{flex: 6}}/>
                                    <View style={{justifyContent: 'space-around', flex: 1}}>
                                        <TouchableOpacity style={styles.send_scores} onPress={() => {/* TODO */}}>
                                            <MaterialCommunityIcons name={'square-edit-outline'} size={85 * ratio} color={DeepBlue.bg_secondary}/>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                : 
                                <Text style={styles.loadingtext}>loading...</Text>
                            }
                        <View style={{backgroundColor: DeepBlue.bg_secondary}}>
                            {!isLoading ? 
                                <MatchStateText/>
                                : 
                                <Text style={styles.loadingtext}>loading...</Text>
                            }
                        </View>
                    </View>
                </View>

                <View style={styles.tempinfo}>
                    <Text style={{...styles.text, color: DeepBlue.text_secondary}}>Player: {tourney.userPlayer.participant.name}</Text>
                    <Text style={{...styles.text, color: DeepBlue.primary}}>{tourney.players.length} players</Text>
                    <Text style={{...styles.text, color: DeepBlue.primary}}>URL: {tourney.url}</Text>
                    <Text style={{...styles.text, color: DeepBlue.accent}}>{tourney.tid}</Text>
                    {!isLoading ? 
                        <Text style={{...styles.text, color: DeepBlue.text_primary}}>Size: {matches.length} sets</Text>
                        : 
                        <Text style={styles.loadingtext}>loading...</Text>
                    }
                </View>
                
            </View>}
        </View>
        
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    },
    dashboard: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tempinfo: {
        flex: 2
    },
    text: {
        fontFamily: 'prototype'
    },
    loadingtext: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary
    },
    currentmatch: {
        flex: 1,
        alignItems: 'stretch',
        width: '100%'
    },
    round_and_scores: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12,
        marginTop: 15
    },
    cm_card:{
        marginHorizontal: 12,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 3,
        minHeight: 170 * ratio ,
        borderColor: DeepBlue.primary,
        overflow: 'hidden',
        backgroundColor: DeepBlue.primary,
        justifyContent: 'space-between'
    },
    opponent_text: {
        fontFamily: 'prototype',
        fontSize: 80 * ratio,
        color: 'white'
    },
    pending_opponent_text: {
        fontFamily: 'prototype',
        fontSize: 49 * ratio,
        color: 'white'
    },
    send_scores: {
        backgroundColor: DeepBlue.primary_light,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 8,
        padding: 3
    },
    pending_rounds_text: {
        fontFamily: 'prototype',
        fontSize: 44 * ratio,
        color: 'white'
    }
});


export default DashboardScreen;