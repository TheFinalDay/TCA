import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

import { DeepBlue } from '../../constants/Colors';
import DashboardHeader from '../UI/DashboardHeader';
import Banner from '../UI/Banner';
import { API } from '../../misc/apiCalls';
import * as tourneyActions from '../../store/actions/tournaments';


const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const DashboardScreen = props => {

    // TODO
    // Score reporting modal
    // Different dashboard look when tourney is completed, ScoreText should display final scores

    //#region states/redux

    const dispatch = useDispatch();

    [matches, setMatches] = useState(null);

    // Current match related states
    [opponent, setOpponent] = useState(null);
    [cumulativeScores, setCumulativeScores] = useState([]);
    [currentMatchState, setCurrentMatchState] = useState(null);
    [numberOfRounds, setNumberOfRounds] = useState([]);
    [currentMatchRound, setCurrentMatchRound] = useState(null);
    [forecasts, setForecasts] = useState([]);

    [isLoading, setIsLoading] = useState(true);
    [isTourneyComplete, setIsTourneyComplete] = useState(false);
    [isPlayerEliminated, setIsPlayerEliminated] = useState(false);

    [playerId, setPlayerId] = useState(null);
    
    const tourney = useSelector(state => state.tournaments.activeTournament);

    //#endregion

    //#region hooks

    /*
    //TODO move this on whichever is the first booted screen shown to the user
    // runs only first time dashboard is loaded

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

      */

    
    // runs only the first time the dashboard is loaded, and when switching dashboards
    useEffect(() => {

        if(tourney){
            setIsLoading(true);
            setPlayerId(tourney.userPlayer.participant.id);
            setIsTourneyComplete(tourney.tourneyData.tournament.state == 'complete');
            API._getMatchList(tourney.url).then(result => {
                setMatches(result.payloadData.matches);
                setCurrentMatchState(getMatchState());
                setIsPlayerEliminated(currentMatchState == 'eliminated');
                setNumberOfRounds(getNumberOfRounds());
                setOpponent(getOpponentData());
                setCumulativeScores([getWinsLosses(true), getWinsLosses(false)]);
                setCurrentMatchRound(getMatchRound());
                setForecasts(getForecastData());
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

        const { style, isForecast, textColor } = props;

        if(opponent || props.opponent){

            const { names, state, isWinner, pendingRound } = isForecast ? props.opponent.data : opponent.data;

            switch(state){// just display opponent name
                case "open": {

                    if(!isForecast){
                        return(
                            <View style={{...style, flexDirection: 'row', alignItems: 'flex-start', padding: 5}}>
                                <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>VS  </Text>
                                <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.opponent_text}}>{names[0]}</Text>
                            </View>
                        );
                    } else {
                        return(
                            <View style={{...style, alignItems: 'center', padding: 5, marginTop: 35 * ratio}}>
                                <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>VS</Text>
                                <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.opponent_forecast_text}}>{names[0]}</Text>
                            </View>
                        );
                    }
                } 
                case "pending": {
                    switch(names.length){
                        case 2:// display pending set with both names
                            if(!isForecast){
                                return(
                                    <View style={{...style, alignItems: 'flex-start', padding: 5}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>{isWinner ? "Winner" : "Loser"} of </Text>
                                            <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.pending_opponent_text}}>{names[0]}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: (isWinner ? 88 : 75) * ratio}}>
                                            <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}> and </Text>
                                            <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.pending_opponent_text}}>{names[1]}</Text>
                                        </View>
                                    </View>
                                );
                            } else {
                                return(
                                    <View style={{...style, alignItems: 'center', padding: 5, marginTop: 25 * ratio}}>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>VS {isWinner ? "winner" : "loser"} of</Text>
                                        <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.pending_opponent_text}}>{names[0]}</Text>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>and</Text>
                                        <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.pending_opponent_text}}>{names[1]}</Text>
                                    </View>
                                );
                            }
                            
                        case 1:// display pending set opponent 'and winner of earlier rounds...'
                            if(!isForecast){
                                return(
                                    <View style={{...style, alignItems: 'flex-start', padding: 5}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>Waiting for  </Text>
                                            <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.pending_opponent_text}}>{names[0]}</Text>
                                        </View>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>and {getMatchRound(pendingRound)} to resolve...</Text>
                                    </View>
                                );
                            } else {
                                return(
                                    <View style={{...style, alignItems: 'center', padding: 5, marginTop: 25 * ratio}}>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>Waiting for</Text>
                                        <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.pending_opponent_text}}>{names[0]}</Text>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>and</Text>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>{getMatchRound(pendingRound)}</Text>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>to resolve...</Text>
                                    </View>
                                );
                            }
                            
                        default:// display 'waiting for more than one pending round...'
                            if(!isForecast){
                                return(
                                    <View style={{...style, alignItems: 'flex-start', padding: 5}}>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>Waiting for  </Text>
                                        <Text style={{color: textColor || DeepBlue.text_primary, ...styles.pending_rounds_text}}>{getMatchRound(pendingRound)}</Text>
                                        <Text style={{color: textColor || DeepBlue.text_primary, ...styles.pending_rounds_text}}>to resolve...</Text>
                                    </View>
                                );
                            } else {
                                return(
                                    <View style={{...style, alignItems: 'center', padding: 5, marginTop: 25 * ratio}}>
                                        <Text style={{fontFamily: 'prototype', color: textColor || DeepBlue.text_primary}}>Waiting for</Text>
                                        <Text style={{color: textColor || DeepBlue.text_primary, ...styles.pending_rounds_text}}>{getMatchRound(pendingRound)}</Text>
                                        <Text style={{color: textColor || DeepBlue.text_primary, ...styles.pending_rounds_text}}>to resolve...</Text>
                                    </View>
                                );
                            }
                            
                    }
                } 
                case "champion": {
                    return(
                        <View style={{...style, alignItems: 'center', padding: 5, marginTop: 35 * ratio}}>
                            <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.opponent_forecast_text}}>Champion!</Text>
                        </View>
                    );
                } 
                case "elimination": {
                    return(
                        <View style={{...style, alignItems: 'center', padding: 5, marginTop: 35 * ratio}}>
                            <Text numberOfLines={1} style={{color: textColor || DeepBlue.text_primary, ...styles.opponent_forecast_text}}>Eliminated</Text>
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
            if(currentMatchState != 'completed' && currentMatchState != 'eliminated'){
                if(currentMatchState == 'open'){
                    return(
                        <Text style={{...styles.text, color: DeepBlue.text_primary, padding: 5}}>Status: <Text style={{color: DeepBlue.accent}}>Ready</Text></Text>
                    );
                } else {
                    return(
                        <Text style={{...styles.text, color: DeepBlue.text_primary, padding: 5}}>Status: <Text style={{color: DeepBlue.text_secondary}}>Pending</Text></Text>
                    );
                }
                
            }
            return <></>;
        }
        return <></>;
        
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
                    <Banner color={DeepBlue.bg_secondary}>   N/A   </Banner>
                );
            }
        } else if(!isTourneyComplete){
            return(
                <Banner color={DeepBlue.bg_secondary}>Eliminated</Banner>
            );
        }
        return <></>;
        
    }

    // Displays both forecasts informations
    const ForecastInfoSection = props => {

        if(forecasts){
            if(currentMatchRound){
                if(currentMatchRound != 'completed'){

                    //TODO handle when one of these is null!!!
                    let winOpponent = forecasts[0] ? getOpponentData(forecasts[0]) : {
                            data: {
                                names: [],
                                state: "champion",
                                isWinner: true,
                                pendingRound: null
                            }
                        };

                    let lossOpponent = forecasts[1] ? getOpponentData(forecasts[1]) : {
                            data: {
                                names: [],
                                state: "elimination",
                                isWinner: true,
                                pendingRound: null
                            }
                        };

                    let gfResetIfWin = (currentMatchRound == "Grand Finals" && lossOpponent.data.state == "elimination");
                    let gfResetIfLoss = (winOpponent.data.state == "champion");

                    return(
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.if_winning_losing_section}>
                                <Text style={styles.if_winning_losing_text}>If winning...</Text>
                                <View style={{backgroundColor: forecasts[0] ? DeepBlue.accent_light : DeepBlue.gold, ...styles.winlose_forecast}}>
                                    {forecasts[0] && <Banner style={styles.forecast_banners} fontSize={31 * ratio} textColor={DeepBlue.text_primary} color={DeepBlue.accent}>{getMatchRound(forecasts[0])}</Banner>}
                                    {gfResetIfWin &&
                                        <View style={styles.grand_finals_reset}>
                                            <Text style={{color: DeepBlue.bg_secondary, ...styles.pending_rounds_text}}>Grand Finals</Text>
                                            <Text style={{color: DeepBlue.bg_secondary, ...styles.opponent_forecast_text}}>Reset!</Text>
                                        </View>}
                                    {!gfResetIfWin && <OpponentText textColor={DeepBlue.bg_secondary} isForecast={true} opponent={winOpponent}/>}
                                </View>
                            </View>
                            <View style={styles.if_winning_losing_section}>
                                <Text style={styles.if_winning_losing_text}>If losing...</Text>
                                <View style={{backgroundColor: forecasts[1] ? DeepBlue.red_light : DeepBlue.text_secondary, ...styles.winlose_forecast}}>
                                    {forecasts[1] && <Banner style={styles.forecast_banners} fontSize={31 * ratio} textColor={DeepBlue.text_primary} color={DeepBlue.red}>{getMatchRound(forecasts[1])}</Banner>}
                                    {forecasts[0] && <OpponentText textColor={DeepBlue.bg_secondary} isForecast={true} opponent={lossOpponent}/>}
                                    {gfResetIfLoss &&
                                        <View style={styles.grand_finals_reset}>
                                            <Text style={{color: DeepBlue.bg_secondary, ...styles.pending_rounds_text}}>Grand Finals</Text>
                                            <Text style={{color: DeepBlue.bg_secondary, ...styles.opponent_forecast_text}}>Reset!</Text>
                                        </View>}
                                </View>
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <Text style={styles.loadingtext}>N/A - Current Match round completed</Text>
                    );
                }
            }
            return (
                <Text style={styles.loadingtext}>N/A - Current Match Round is null</Text>
            );
        } else if(!isTourneyComplete){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
                    <Text style={{...styles.eliminatedtext, fontSize: 18}}>Better Luck Next Time!</Text>
                    <Text style={styles.eliminatedtext}>Refresh this page after</Text>
                    <Text style={styles.eliminatedtext}>the tourney is over.</Text>
                </View>
            );
        }
        return <></>;
        
        
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

    // returns the current match state
    const getMatchState = () => {
        if(!isTourneyComplete){
            if(matches){
                let current = getCurrentMatch();
                if(current){
                    return current.match.state;
                }
                // player was eliminated
                return 'eliminated';
            }
            // matches not loaded yet
            return;
        }
        //TODO remove this
        return 'completed';
    }

    // returns the current match round
    const getMatchRound = (currentMatch) => {
        if(!isTourneyComplete){
            if(matches){
                let current = currentMatch || getCurrentMatch();
                if(current){
                    let round = current.match.round;
                    if((round < 0 && round > numberOfRounds[1] + 1) 
                    || (round > 0 && round < numberOfRounds[0] - 2)){ // round is not losers/winners semis/finals
                        return (round < 0) ? "Losers Round " + Math.abs(round) : "Winners Round " + round;
                    } else if(round == numberOfRounds[1] + 1 || round == numberOfRounds[0] - 2){ // semis
                        return (round < 0) ? "Losers Semifinals" : "Winners Semifinals";
                    } else if(round == numberOfRounds[1] || round == numberOfRounds[0] - 1){ // finals
                        return (round < 0) ? "Losers Finals" : "Winners Finals";
                    } else if(round == numberOfRounds[0]){
                        return "Grand Finals";
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

    // returns the current win or lose scores
    const getWinsLosses = (isWins) => {
        if(matches){

            let wins = matches.filter(o => (o.match.winner_id == playerId)).length;
            let losses = matches.filter(o => (o.match.loser_id == playerId)).length;

            if(isWins){
                return wins;
            }
            return losses;
        }
        // matches not loaded yet
        return;
    }

    // returns the current opponent(s) data OR the forecast opponent data
    const getOpponentData = (current) => {
        if(!isTourneyComplete){
            if(matches){
                let forecastMode = current ? true : false; // algorithm changes only slightly when true
                current = current || getCurrentMatch();
                if(current){

                    /**
                     * normal behavior          : the current match state is open, therefore player 2 has been decided
                     * forecastMode behavior    : at least one player in the prereq match is decided
                     */
                    if(forecastMode ? (current.match.player1_id || current.match.player2_id) : current.match.state == 'open'){ // player 2 already decided
                        
                        /**
                         * Yeah? Imbricated ternary operators? What of it?
                         * 
                         * normal behavior          : we return the playerId that is not the user's Id
                         * forecastMode behavior    : we return whichever playerId is not the null one
                         */
                        let opponentId = forecastMode ? 
                            (current.match.player1_id ? current.match.player1_id : current.match.player2_id) : 
                            (current.match.player1_id == playerId ? current.match.player2_id : current.match.player1_id);

                        let opponent = tourney.players.find(player => (player.participant.id == opponentId));
                        if(!forecastMode){ setOpponent(opponent);}
                        return {
                            data: {
                                names: [opponent.participant.name],
                                state: "open",
                                isWinner: true,
                                pendingRound: null
                            }
                        };

                    } else { // player 2 not decided yet

                        /**
                         * normal behavior          : we return the match Id of the player2 opponent's pending match (whichever is null)
                         * forecastMode behavior    : we return the prereq match Id that is'nt the current match Id
                         */
                        let pendingMatchId = "";
                        if(forecastMode){
                            let currentForecastMode = getCurrentMatch();
                            pendingMatchId = (current.match.player1_prereq_match_id != currentForecastMode.match.id) ?
                                current.match.player1_prereq_match_id :
                                current.match.player2_prereq_match_id;
                        } else {
                            pendingMatchId = current.match.player1_id ? current.match.player2_prereq_match_id : current.match.player1_prereq_match_id;
                        }

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
                                /**
                                 * XNOR logic: 
                                 * if both sides are winners or both sides are losers
                                 */
                                if(!((!currentSide && pendingSide) || (!pendingSide && currentSide))){
                                    return {
                                        data: {
                                            names: [opponent1.participant.name, opponent2.participant.name],
                                            state: "pending",
                                            isWinner: true,
                                            pendingRound: pending
                                        }
                                    };
                                } else {
                                    if(pending.match.round == numberOfRounds[1] && current.match.round == numberOfRounds[0]){
                                        return {
                                            data: {
                                                names: [opponent1.participant.name, opponent2.participant.name],
                                                state: "pending",
                                                isWinner: true,
                                                pendingRound: pending
                                            }
                                        };
                                    } else {
                                        return {
                                        data: {
                                            names: [opponent1.participant.name, opponent2.participant.name],
                                            state: "pending",
                                            isWinner: false,
                                            pendingRound: pending
                                        }
                                    };
                                    }
                                    
                                }
                                
                            } else {
                                return {
                                    data: {
                                        names: [(opponent1 ? opponent1 : opponent2).participant.name],
                                        state: "pending",
                                        isWinner: true,
                                        pendingRound: pending
                                    }
                                };
                            }
                        }
                        return {
                            data: {
                                names: [],
                                state: "pending",
                                isWinner: true,
                                pendingRound: pending
                            }
                        };
                    }
                }
                // player was eliminated
                return {
                    data: {
                        names: [],
                        state: "elimination",
                        isWinner: true,
                        pendingRound: null
                    }
                }
            }
            // matches not loaded yet
            return;
        }
        return;
    }

    // get the number of rounds for each side(ex: 5 rounds in winners and 6 rounds in losers)
    const getNumberOfRounds = () => {
        if(!isTourneyComplete){
            if(matches){
                let highest = 1;
                let lowest = -1;

                for (let i = 0; i < matches.length; i++) {
                    let value = matches[i].match.round;
                    lowest = (value < lowest) ? value : lowest;
                    highest = (value > highest) ? value : highest;
                }
                return [highest, lowest];
            }
            return;
        }
        return;
    }

    // return the forecast if winning current match data
    const getForecastData = () => {
        if(!isTourneyComplete){
            if(matches){
                let current = getCurrentMatch();
                if(current){
                    let currentMatchId = current.match.id;
                    let prereqs = matches.filter(match => (match.match.prerequisite_match_ids_csv.includes(currentMatchId)));

                    let winForecast = null;
                    let lossForecast = null;

                    if(prereqs.length > 1){ // we're in winners side
                        prereqs.forEach(prereq => {
                            if(prereq.match.round > current.match.round){
                                winForecast = prereq;
                            } else {
                                lossForecast = prereq;
                            }
                        });
                    } else if(current.match.round < 0){ // we're in losers side
                        winForecast = prereqs[0];
                    } else if(prereqs.length > 0){ // we're in grand finals winners side
                        if(cumulativeScores[1] == 0){ // player is champion of winners bracket
                            lossForecast = prereqs[0];
                        } else { // player is champion of losers bracket
                            winForecast = prereqs[0];
                        }
                    } else { // we're in grand finals losers side
                        //both forecasts are null (champion or #2)
                    }
                    return [winForecast, lossForecast];
                }
                return;
            }
            return;
        }
        return;
    }

    //#endregion

    return(

        <View style={styles.screen}>
            <DashboardHeader 
                refresh={tourney ? () => {
                    dispatch(tourneyActions.refreshTourney(tourney.url, tourney.players, tourney.userPlayer));
                } : null}
                openDrawer={props.navigation.openDrawer} 
                iconSize={85 * ratio} 
                playerName={tourney?.userPlayer.participant.name || "Empty"}>
                    {tourney?.tourneyData.tournament.name || "Nothing here!"}
            </DashboardHeader>
            {tourney && <View style={styles.dashboard}>

                {!isTourneyComplete &&<View style={styles.currentmatch}>

                    <View style={styles.round_and_scores}>
                        {!isLoading ? 
                            <MatchRoundText/>
                            : 
                            <View>
                                <ActivityIndicator color={DeepBlue.text_secondary}/>
                            </View>
                        }
                        {!isLoading ? 
                            <ScoreText/>
                            : 
                            <View>
                                <ActivityIndicator color={DeepBlue.text_secondary}/>
                            </View>
                        }
                    </View>

                    <View style={{...styles.cm_card, minHeight: isPlayerEliminated ? 260 * ratio : 175 * ratio}}>
                        {!isLoading ? 
                            <View style={{flexDirection: 'row', flex: 1}}>
                                {!isPlayerEliminated ? 
                                    <OpponentText style={{flex: 6}} isForecast={false}/> 
                                    : 
                                    <OpponentText style={{flex: 1}} isForecast={false}/>
                                }
                                {!isPlayerEliminated &&<View style={{justifyContent: 'space-around', flex: 1}}>
                                     <TouchableOpacity style={styles.send_scores} onPress={() => {/* TODO */}}>
                                        <MaterialCommunityIcons name={'square-edit-outline'} size={85 * ratio} color={DeepBlue.bg_secondary}/>
                                    </TouchableOpacity>
                                </View>}
                                
                            </View>
                            : 
                            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                                <ActivityIndicator size={'large'} color={DeepBlue.text_secondary}/>
                            </View>
                        }
                        {!isPlayerEliminated && <View style={{backgroundColor: DeepBlue.bg_secondary}}>
                            {!isLoading ? 
                                <MatchStateText/>
                                : 
                                <View style={{alignItems: 'flex-start'}}>
                                    <ActivityIndicator color={DeepBlue.text_secondary}/>
                                </View>
                            }
                        </View>}
                    </View>
                </View>}

                {!isTourneyComplete && <View style={styles.forecast_section}>
                    <View style={styles.forecast_border}/>
                    <View style={styles.forecast_inner}>
                        <Text style={styles.forecast_text}>Forecast</Text>
                        {!isLoading ? 
                            <ForecastInfoSection/>
                            : 
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <ActivityIndicator size={'large'} color={DeepBlue.text_secondary}/>
                            </View>
                        }
                    </View>
                    
                    
                </View>}
                
            </View>}
        </View>
        
    );
}

/* temp info stuff

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

*/

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
    text: {
        fontFamily: 'prototype',
        color: 'white'
    },
    loadingtext: {
        fontFamily: 'prototype',
        color: DeepBlue.text_secondary
    },
    currentmatch: {
        flex: 4,
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
        minHeight: 175 * ratio ,
        borderColor: DeepBlue.primary,
        overflow: 'hidden',
        backgroundColor: DeepBlue.primary,
        justifyContent: 'space-between'
    },
    opponent_text: {
        fontFamily: 'prototype',
        fontSize: 80 * ratio,
    },
    opponent_forecast_text: {
        fontFamily: 'prototype',
        fontSize: 55 * ratio,
    },
    pending_opponent_text: {
        fontFamily: 'prototype',
        fontSize: 50 * ratio,
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
    },
    forecast_section:{
        flex: 13, 
        alignItems: 'center', 
    },
    forecast_inner: {
        alignItems: 'center', 
        marginHorizontal: 20,
        minHeight: 620 * ratio
    },
    forecast_text: {
        fontFamily: 'prototype',
        fontSize: 50 * ratio,
        color: DeepBlue.primary_light,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingTop: 4,
        borderRadius: 50 * ratio,
        borderWidth: 3,
        borderColor: DeepBlue.primary,
        backgroundColor: DeepBlue.bg_primary
    },
    forecast_border: {
        minHeight: 600 * ratio ,
        width: '95%',
        marginHorizontal: 12, 
        alignItems: 'center',
        position: 'absolute',
        borderWidth: 3,
        borderColor: DeepBlue.primary,
        borderRadius: 30,
        top: 40 * ratio
    },
    winlose_forecast: {
        alignItems: 'center',
        minHeight: 440 * ratio,
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 20,
    },
    grand_finals_reset: {
        alignItems: 'center', 
        padding: 5, 
        marginTop: 35 * ratio
    },
    forecast_banners: {
        marginTop: 20 * ratio
    },
    if_winning_losing_text: {
        fontFamily: 'prototype', 
        color: DeepBlue.text_primary, 
        textAlign: 'center'
    },
    if_winning_losing_section: {
        alignItems: 'stretch', 
        flex: 1, 
        width: '100%'
    },
    eliminatedtext: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        textAlign: 'center'
    }
});


export default DashboardScreen;