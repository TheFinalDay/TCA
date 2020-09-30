import { API } from '../../misc/apiCalls';

export const CREATE_TOURNEY = 'CREATE_TOURNEY';
export const REFRESH_TOURNEY= 'REFRESH_TOURNEY';
export const DELETE_TOURNEY = 'DELETE_TOURNEY';
export const ACTIVATE_TOURNEY = 'ACTIVATE_TOURNEY';

export const createTourney = (url, players, userPlayer) => (dispatch) => new Promise((resolve, reject) => {

        API._getTournamentInfo(url).then(result => {
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
            resolve(result.payloadData.tournamentInfo);
        }).catch(err => {
            console.log("createTourney failed");
            reject(err);
        });
        
});

export const deleteTourney = (tourneyId) => {
    return async dispatch => {
        console.log('deleting: ' + tourneyId);
        dispatch({
            type: DELETE_TOURNEY,
            tid: tourneyId
        });
    };
};

export const activateTourney = (tourneyId, tourneyUrl, playerId) => {

    return async (dispatch, getState) => {

        // check if store already has the tourney
        let tournaments = getState().tournaments.userTournaments;
        
        if(!tournaments.some(t => t.tid == tourneyId)){
            //if not, api get the tourney info
            let tresult = await API._getTournamentInfo(tourneyUrl);
            let presult = await API._getPlayerList(tourneyUrl);
            let userPlayer = presult.payloadData.players.find(p => p.participant.id == playerId);

            console.log('activating & getting info: ' + tourneyId);
            dispatch({
                type: ACTIVATE_TOURNEY,
                tid: tourneyId,
                tourneyData: {
                    tid: tresult.payloadData.tournamentInfo.tournament.id,
                    url: tourneyUrl,
                    players: presult.payloadData.players,
                    tourneyData: tresult.payloadData.tournamentInfo,
                    userPlayer: userPlayer
                }
            });
        }
        
        console.log('activating: ' + tourneyId);
        dispatch({
            type: ACTIVATE_TOURNEY,
            tid: tourneyId,
            tourneyData: null
        });
    };
};

export const refreshTourney = (url, players, userPlayer) => {

    console.log('refreshing: ' + url);
    return async dispatch => {

        let result = await API._getTournamentInfo(url);

        dispatch({
            type: REFRESH_TOURNEY,
            tourneyData: {
                tid: result.payloadData.tournamentInfo.tournament.id,
                url,
                players: players,
                tourneyData: result.payloadData.tournamentInfo,
                userPlayer: userPlayer
            }
        });
    };
}
