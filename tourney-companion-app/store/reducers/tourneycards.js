import TourneyCard from '../../models/tourneycard';
import { CREATE_TC } from '../actions/tourneycards';
import { UPDATE_TC } from '../actions/tourneycards';
import { DELETE_TC } from '../actions/tourneycards';
import { SET_TC } from '../actions/tourneycards';

const initialState = {
    tourneyCards: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CREATE_TC: case UPDATE_TC:

            const addedTC = action.tourneyCard;

            const createTCTid = addedTC.tid;
            const createTCUrl = addedTC.url;
            const createTCTname = addedTC.tname;
            const createTCTgame = addedTC.tgame;
            const createTCTplayers = addedTC.tplayers;
            const createTCTtype = addedTC.ttype;
            const createTCTdate = addedTC.tdate;
            const createTCPname = addedTC.pname

            const newOrUpdatedTC = new TourneyCard(
                createTCTid,
                createTCUrl,
                createTCTname,
                createTCTgame,
                createTCTplayers,
                createTCTtype,
                createTCTdate,
                createTCPname
            );

            if(state.tourneyCards.find(tc => tc.tid === createTCTid)){
                // TC already exists in store
                console.log("tourneycards update...");
                let filteredArray = state.tourneyCards.filter(tc => tc.tid !== createTCTid);
                return {
                    ...state,
                    tourneyCards: [ ...filteredArray, newOrUpdatedTC]
                };

            } else {
                // first time TC is added
                console.log("new tourneycard added...");
                return {
                    ...state,
                    tourneyCards: [ ...state.tourneyCards, newOrUpdatedTC]
                };
            }

        case DELETE_TC:

            //TODO handle when UD is removed while it's dashboard is active

            let filteredArray = state.tourneyCards.filter(tc => tc.tid !== action.tid);

            return {
                ...state,
                tourneyCards: filteredArray
            };

        case SET_TC:

            return {
                tourneyCards: action.tourneyCards
            };

        default:
            return state;
    }

};