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

const _getUserTournaments = async (key) => {
    let resData = null;
    let status = null;

        try {
            const response = await fetch(
                `https://api.challonge.com/v1/tournaments.json?api_key=${key}`, 
                    {
                    method: 'GET',
                    header: {
                        'Content-type': 'application/json'
                    }
                }
            );

            if (response.status !== 200) { 
                console.log(`${response.status} ${response.statusText} | ${response.url}`); 
                return {
                    payloadData: {
                        status: response.status,
                        tournaments: null
                    }
                };
            } else {
                status = response.status;
                resData = await response.json();

            }

        } catch (e) { throw e; }

        return {
            payloadData: {
                status: status,
                tournaments: resData
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

const _registerTourney = async (tid) => {

    let resData = null;

    if (tid == '') {
        return;
    }

    try {
        const response = await fetch(
            `https://tca-testing.firebaseio.com/registeredtourneys.json`, 
                {
                method: 'POST',
                header: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    tid
                })
            }
        );

        if (response.status !== 200) { 
            console.log(`${response.status} ${response.statusText} | ${response.url}`); 
            return;
        } else {
            resData = await response.json();
        }

        console.log(resData);

    } catch (e) { throw e; }

    return {
        payloadData: {
            id: resData.name,
            tid: tid
        }
    };
};

export const API = {
    _getPlayerList,
    _getMatchList,
    _getTournamentInfo,
    _registerTourney,
    _getUserTournaments
}
