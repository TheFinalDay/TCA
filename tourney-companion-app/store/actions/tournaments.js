import { API } from '../../misc/apiCalls';

export const CREATE_TOURNEY = 'CREATE_TOURNEY';
export const DELETE_TOURNEY = 'DELETE_TOURNEY';

export const createTourney = (url, players, userPlayer) => {
    return async dispatch => {

        let result = await API._getTournamentInfo(url);

        dispatch({
            type: CREATE_TOURNEY,
            tourneyData: {
                tid: result.payloadData.tournamentInfo.tournament.id,
                url,
                players: players,
                tourneyData: result.payloadData.tournamentInfo,
                userPlayer: userPlayer
            }
        });
    };
};

export const deleteTourney = (tourneyId) => {
    console.log('deleting: ' + tourneyId)
    return { type: DELETE_TOURNEY, tid: tourneyId}
}
