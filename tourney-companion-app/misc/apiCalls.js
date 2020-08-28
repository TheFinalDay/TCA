import CHALLONGE_API_KEY from '../data/dataAPI';

const _getPlayerList = async (url) => {

    let resData = null;

    if (url == '') {
        return;
    }

    try {
        const response = await fetch(
            `https://api.challonge.com/v1/tournaments/${url}/participants.json?api_key=${CHALLONGE_API_KEY}`, 
                {
                method: 'GET',
                header: {
                    'Content-type': 'application/json'
                }
            }
        );

        if (response.status !== 200) { 
            console.log(`${response.status} ${response.statusText} | ${response.url}`); 
            return;
        } else {
            resData = await response.json();
        }

        
    } catch (e) { throw e; }


    return {
        payloadData: {
            players: resData
        }
    };
};

const _getTournamentInfo = async (url) => {
    let resData = null;

        if (url == '') {
            return;
        }

        try {
            const response = await fetch(
                `https://api.challonge.com/v1/tournaments/${url}.json?api_key=${CHALLONGE_API_KEY}`, 
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
                return;
            } else {
                resData = await response.json();
            }

        } catch (e) { throw e; }

        return {
            payloadData: {
                tournamentInfo: resData
            }
        };
};

const _getMatchList = async (url) => {

    let resData = null;

    if (url == '') {
        return;
    }

    try {
        const response = await fetch(
            `https://api.challonge.com/v1/tournaments/${url}/matches.json?api_key=${CHALLONGE_API_KEY}`, 
                {
                method: 'GET',
                header: {
                    'Content-type': 'application/json'
                }
            }
        );

        if (response.status !== 200) { 
            console.log(`${response.status} ${response.statusText} | ${response.url}`); 
            return;
        } else {
            resData = await response.json();
        }

        
    } catch (e) { throw e; }


    return {
        payloadData: {
            matches: resData
        }
    };
};

export const API = {
    _getPlayerList,
    _getMatchList,
    _getTournamentInfo
}
