export const CREATE_TOURNEY = 'CREATE_TOURNEY';

export const createTourney = (url) => {
    return async dispatch => {

        // any async code you want here

        const resData = null;

        try {
            // tweak this according to challonge API...
            const response = await fetch('url here...', {
                method: 'GET',
                header: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ // stringify generates an ID, so no need to put an ID in the body
                    url
                })
            });

            // do something with response

            resData = await response.json();

            console.log(resData);

        } catch (e) { throw e; }

        // need to better handle exceptions...

        dispatch({
            type: CREATE_TOURNEY,
            tourneyData: {
                id: resData.name,
                url,
                players
            }
        });
    };
};