import TOURNEYS from '../../data/dummy';
import Tournament from '../../models/tournament';
import { CREATE_TOURNEY } from '../actions/tournaments';

const initialState = {
    userTournaments: TOURNEYS,
    totalAmount: 0
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CREATE_TOURNEY: 
            const addedTourney = action.tourneyData;

            const tourneyUrl = addedTourney.url;
            const tourneyPlayers = addedTourney.players;

            if (state.userTournaments[addedTourney.id]) {
                // do something to check if the tournament is already joined by the user
                const updatedTourney = new Tournament(
                    tourneyUrl,
                    tourneyPlayers
                );
                return {
                    ...state,
                    userTournaments: { ...state.userTournaments, [addedTourney.id]: updatedTourney}
                }
            } else {
                // adding the new tourney to the user's list of tourneys
                const newTourney = new Tournament(tourneyUrl, tourneyPlayers);
                return {
                    ...state,
                    userTournaments: { ...state.userTournaments, [addedTourney.id]: newTourney },
                    totalAmount: state.totalAmount + 1
                }
            }
            
            
    }


    return state;
};