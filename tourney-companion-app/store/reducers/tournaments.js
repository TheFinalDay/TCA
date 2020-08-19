import Tournament from '../../models/tournament';
import { CREATE_TOURNEY } from '../actions/tournaments';
import { REGISTER_TOURNEY } from '../actions/tournaments';
import { DELETE_TOURNEY } from '../actions/tournaments';
import { DELETE_UNREGISTERED_TOURNEYS } from '../actions/tournaments';

const initialState = {

    userTournaments: [],
    mostRecentUrl: ''
};

export default (state = initialState, action) => {

    console.log(action.type);

    switch (action.type) {
        case CREATE_TOURNEY: 
            const addedTourney = action.tourneyData;
            const createTourneyId = addedTourney.tid;
            const createTourneyUrl = addedTourney.url;
            const createTourneyPlayers = addedTourney.players;

            const newOrUpdatedTourney = new Tournament(
                createTourneyId,
                createTourneyUrl,
                createTourneyPlayers,
                false,
                null
            );

            if(state.userTournaments.find(tourney => tourney.tid === createTourneyId)){
                // tourney already exists in array
                let filteredArray = state.userTournaments.filter(tourney => tourney.tid != createTourneyId);
                return {
                    ...state,
                    userTournaments: [ ...filteredArray, newOrUpdatedTourney],
                    mostRecentUrl: createTourneyUrl
                };

            } else {
                // first time tourney is added
                return {
                    ...state,
                    userTournaments: [ ...state.userTournaments, newOrUpdatedTourney],
                    mostRecentUrl: createTourneyUrl
                };
            }

            
        case REGISTER_TOURNEY:
            
            
            const tourneyToRegister = state.userTournaments.find(tourney => tourney.tid === action.tid);

            const registeredTourneyUrl = tourneyToRegister.url;
            const registeredTourneyPlayers = tourneyToRegister.players;
            const registeredTourneyUserPlayer = action.userPlayer;

            const registeredTourney = new Tournament(
                action.tid,
                registeredTourneyUrl,
                registeredTourneyPlayers,
                true,
                registeredTourneyUserPlayer
            );

            // tourney already exists in array
            let filteredArray = state.userTournaments.filter(tourney => tourney.tid != action.tid);

            return {
                ...state,
                userTournaments: [ ...filteredArray, registeredTourney]
            };
        case DELETE_TOURNEY:

            return {
                ...state,
                userTournaments: state.userTournaments.filter(tourney => tourney.tid !== action.tid)
            };
        case DELETE_UNREGISTERED_TOURNEYS:
            console.log("### delete_unregisteredtourney log")
            console.log(state.userTournaments);
            const updatedUserTournaments = state.userTournaments.filter(tourney => tourney.isRegistered != false);
            console.log("### delete_unregisteredtourney log after filter")
            console.log(updatedUserTournaments);

            return {
                ...state,
                userTournaments: updatedUserTournaments
            }
        default:
            return state;
    }

};