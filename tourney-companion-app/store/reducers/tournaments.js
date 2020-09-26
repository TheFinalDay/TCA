import Tournament from '../../models/tournament';
import { CREATE_TOURNEY } from '../actions/tournaments';
import { REFRESH_TOURNEY } from '../actions/tournaments';
import { DELETE_TOURNEY } from '../actions/tournaments';
import { ACTIVATE_TOURNEY } from '../actions/tournaments';

const initialState = {

    userTournaments: [],
    activeTournament: null
};

export default (state = initialState, action) => {

    console.log(action.type);

    switch (action.type) {
        case CREATE_TOURNEY: case REFRESH_TOURNEY:

            const createTourneyId = action.tourneyData.tid;
            const createTourneyUrl = action.tourneyData.url;
            const createTourneyPlayers = action.tourneyData.players;
            const createTourneyData = action.tourneyData.tourneyData;
            const createTourneyUser = action.tourneyData.userPlayer;

            const newOrUpdatedTourney = new Tournament(
                createTourneyId,
                createTourneyUrl,
                createTourneyPlayers,
                createTourneyData,
                createTourneyUser
            );

            if(state.userTournaments.find(tourney => tourney.tid === createTourneyId)){
                // tourney already exists in array
                console.log("tourney update...");
                let filteredArray = state.userTournaments.filter(tourney => tourney.tid != createTourneyId);
                if(action.type == REFRESH_TOURNEY){
                    return {
                        ...state,
                        userTournaments: [ ...filteredArray, newOrUpdatedTourney],
                        activeTournament: newOrUpdatedTourney
                    };
                }
                return {
                    ...state,
                    userTournaments: [ ...filteredArray, newOrUpdatedTourney]
                };

            } else {
                // first time tourney is added
                console.log("new tourney added...");
                return {
                    ...state,
                    userTournaments: [ ...state.userTournaments, newOrUpdatedTourney]
                };
            }

        case DELETE_TOURNEY:

            let toDelete = state.userTournaments.find(tourney => tourney.tid == action.tid);

            if (state.activeTournament == toDelete) {
                return {
                    ...state,
                    userTournaments: state.userTournaments.filter(tourney => tourney.tid !== action.tid),
                    activeTournament: null
                };
            }

            return {
                ...state,
                userTournaments: state.userTournaments.filter(tourney => tourney.tid !== action.tid)
            };

        case ACTIVATE_TOURNEY:

            if(action.tourneyData){

                const activateTourneyId = action.tourneyData.tid; 
                const activateTourneyUrl = action.tourneyData.url;
                const activateTourneyPlayers = action.tourneyData.players;
                const activateTourneyData = action.tourneyData.tourneyData;
                const activateTourneyUser = action.tourneyData.userPlayer;

                const newActivatedTourney = new Tournament(
                    activateTourneyId,
                    activateTourneyUrl,
                    activateTourneyPlayers,
                    activateTourneyData,
                    activateTourneyUser
                );

                return {
                    ...state,
                    userTournaments: [ ...state.userTournaments, newActivatedTourney],
                    activeTournament: newActivatedTourney
                };

            } else {

                let toActivate = state.userTournaments.find(tourney => tourney.tid == action.tid);
                return {
                    ...state,
                    activeTournament: toActivate
                };
            }

        default:
            return state;
    }

};