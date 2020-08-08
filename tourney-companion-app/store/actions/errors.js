export const SET_TOURNAMENTURLNOTFOUND = 'SET_TOURNAMENTURLNOTFOUND';

export const setTournamentUrlNotFound = (isT404) => {
    return {type: SET_TOURNAMENTURLNOTFOUND, isTournamentUrlNotFound: isT404};
};