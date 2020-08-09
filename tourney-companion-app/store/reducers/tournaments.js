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

    switch (action.type) {
        case CREATE_TOURNEY: 
            const addedTourney = action.tourneyData;

            const createTourneyUrl = addedTourney.url;
            const createTourneyPlayers = addedTourney.players;

            const newOrUpdatedTourney = new Tournament(
                createTourneyUrl,
                createTourneyPlayers,
                false
            );
            return {
                ...state,
                userTournaments: { ...state.userTournaments, [addedTourney.id]: newOrUpdatedTourney},
                mostRecentUrl: newOrUpdatedTourney.url
            };
        case REGISTER_TOURNEY:
            const tourneyToRegister = state.userTournaments.find(tourney => tourney.id === action.tid);

            const registeredTourneyUrl = tourneyToRegister.url;
            const registeredTourneyPlayers = tourneyToRegister.players;

            const registeredTourney = new Tournament(
                registeredTourneyUrl,
                registeredTourneyPlayers,
                true
            );
            return {
                ...state,
                userTournaments: { ...state.userTournaments, [tourneyToRegister.id]: registeredTourney}
            };
        case DELETE_TOURNEY:
            return {
                ...state,
                userTournaments: state.userTournaments.filter(tourney => tourney.id !== action.tid)
            };
        case DELETE_UNREGISTERED_TOURNEYS:
            return {
                ...state,
                userTournaments: state.userTournaments.filter(tourney => tourney.isRegistered !== false)
            }
        default:
            return state;
    }

};