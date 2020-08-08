import Tournament from '../../models/tournament';
import { CREATE_TOURNEY } from '../actions/tournaments';

const initialState = {
    userTournaments: [],
    mostRecentUrl: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CREATE_TOURNEY: 
            const addedTourney = action.tourneyData;

            const tourneyUrl = addedTourney.url;
            const tourneyPlayers = addedTourney.players;

            const newOrUpdatedTourney = new Tournament(
                tourneyUrl,
                tourneyPlayers
            );
            return {
                ...state,
                userTournaments: { ...state.userTournaments, [addedTourney.id]: newOrUpdatedTourney},
                mostRecentUrl: newOrUpdatedTourney.url
            }
            
            
    }


    return state;
};