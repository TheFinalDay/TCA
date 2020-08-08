import { SET_TOURNAMENTURLNOTFOUND } from '../actions/errors';

const initialState = {
    isTournamentUrlNotFound: false
};

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOURNAMENTURLNOTFOUND":
            const newState = action.isTournamentUrlNotFound;
            return {...state, isTournamentUrlNotFound: newState};
        default:
            return state;
    }
    
}

export default errorsReducer;