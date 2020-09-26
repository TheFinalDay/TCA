export const CREATE_TC = 'CREATE_TC';
export const UPDATE_TC = 'UPDATE_TC';
export const DELETE_TC = 'DELETE_TC';
export const SET_TC = 'SET_TC';

import { fetchAllTourneyCard, dropTourneyCardRow, insertTourneyCard, updateTCPlayerName } from '../../misc/db';

export const createTourneyCard = (tourneyInfo, tourneyUrl, userPlayer) => {
    return async dispatch => {

        // tid, url, tname, tgame, tplayers, ttype, tdate, pname
        let tid = tourneyInfo.tournament.id;
        let url = tourneyUrl;
        let tname = tourneyInfo.tournament.name;
        let tgame = tourneyInfo.tournament.game_name || tourneyInfo.tournament.category || "Miscellaneous";
        let tplayers = tourneyInfo.tournament.participants_count;
        let ttype = tourneyInfo.tournament.tournament_type;
        let tdate = new Date(tourneyInfo.tournament.started_at).toDateString();
        let pname = userPlayer.participant.name;
        let pid = userPlayer.participant.id;

        insertTourneyCard(tid, url, tname, tgame, tplayers, ttype, tdate, pname, pid)
            .then(() => {
                console.log('Inserted '+ url +' tourneyCard row');
                return dispatch({
                    type: CREATE_TC,
                    tourneyCard: {
                        tid: tid,
                        url: url,
                        tname: tname,
                        tgame: tgame,
                        tplayers: tplayers,
                        ttype: ttype,
                        tdate: tdate,
                        pname: pname,
                        pid: pid
                    }
                });
            })
            .catch(err => {
                if(err.toString().includes("UNIQUE constraint")){
                    updateTCPlayerName(tid, pname, pid)
                        .then(() => {
                            return dispatch({
                                type: UPDATE_TC,
                                tourneyCard: {
                                    tid: tid,
                                    url: url,
                                    tname: tname,
                                    tgame: tgame,
                                    tplayers: tplayers,
                                    ttype: ttype,
                                    tdate: tdate,
                                    pname: pname,
                                    pid: pid
                                }
                            });
                        }).catch(err => {
                            console.log('!! Update tourneyCard row failed');
                            throw err;
                        })
                } else {
                    console.log('!! Insert tourneyCard row failed');
                    throw err;
                }
                
            });
    
    };

};

export const deleteTourneyCard = (tidToDelete) => {
    return async dispatch => {
        try{
            await dropTourneyCardRow(tidToDelete);
            dispatch({
                type: DELETE_TC,
                tid: tidToDelete
            });
        } catch(err){
            throw err;
        }
    };

};

export const setTourneyCards = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchAllTourneyCard();
            dispatch({
                type: SET_TC,
                tourneyCards: dbResult.rows._array
            });
        } catch(err){
            throw err;
        }
        
    };
};