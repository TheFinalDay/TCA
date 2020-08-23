import Tournament from '../../models/tournament';
import { CREATE_TOURNEY } from '../actions/tournaments';
import { DELETE_TOURNEY } from '../actions/tournaments';

const initialState = {

    userTournaments: []
};

export default (state = initialState, action) => {

    console.log(action.type);

    switch (action.type) {
        case CREATE_TOURNEY: 

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
                let filteredArray = state.userTournaments.filter(tourney => tourney.tid != createTourneyId);
                return {
                    ...state,
                    userTournaments: [ ...filteredArray, newOrUpdatedTourney]
                };

            } else {
                // first time tourney is added
                return {
                    ...state,
                    userTournaments: [ ...state.userTournaments, newOrUpdatedTourney]
                };
            }

        case DELETE_TOURNEY:

            return {
                ...state,
                userTournaments: state.userTournaments.filter(tourney => tourney.tid !== action.tid)
            };
        default:
            return state;
    }

};