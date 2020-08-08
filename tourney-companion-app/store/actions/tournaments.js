import CHALLONGE_API_KEY from '../../data/dataAPI';
import { SET_TOURNAMENTURLNOTFOUND } from '../actions/errors';

export const CREATE_TOURNEY = 'CREATE_TOURNEY';

export const createTourney = (url) => {
    return async dispatch => {

        // any async code you want here

        let resData = null;

        if (url == '') {
            return;
        }

        try {
            // tweak this according to challonge API...
            const response = await fetch(
                `https://api.challonge.com/v1/tournaments/${url}/participants.json?api_key=${CHALLONGE_API_KEY}`, 
                    {
                    method: 'GET',
                    header: {
                        'Content-type': 'application/json'
                    }
                    /*,
                    body: JSON.stringify({ // stringify generates an ID, so no need to put an ID in the body
                        url
                    })*/
                }
            );

            if (response.status !== 200) { 
                console.log(`${response.status} ${response.statusText} | ${response.url}`); 
                dispatch({
                    type: SET_TOURNAMENTURLNOTFOUND,
                    isTournamentUrlNotFound: true
                });
                return;
            } else {
                dispatch({
                    type: SET_TOURNAMENTURLNOTFOUND,
                    isTournamentUrlNotFound: false
                });
                resData = await response.json();

            }

            
        } catch (e) { throw e; }
        // todo: need to better handle exceptions...

        dispatch({
            type: CREATE_TOURNEY,
            tourneyData: {
                id: resData[0].participant.tournament_id,
                url,
                players: resData
            }
        });
    };
};