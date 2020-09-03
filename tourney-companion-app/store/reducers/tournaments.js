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

            const addedTourney = action.tourneyData;

            const createTourneyId = addedTourney.tid;
            const createTourneyUrl = addedTourney.url;
            const createTourneyPlayers = addedTourney.players;
            const createTourneyData = addedTourney.tourneyData;
            const createTourneyUser = addedTourney.userPlayer;

            const newOrUpdatedTourney = new Tournament(
                createTourneyId,
                createTourneyUrl,
                createTourneyPlayers,
                createTourneyData,
                createTourneyUser
            );

            if(state.userTournaments.find(tourney => tourney.tid === createTourneyId)){
                // tourney already exists in array
                console.log("tourney update...")
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
                console.log("new tourney added...")
                // first time tourney is added
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

            let toActivate = state.userTournaments.find(tourney => tourney.tid == action.tid);

            return {
                ...state,
                activeTournament: toActivate
            };

        default:
            return state;
    }

};