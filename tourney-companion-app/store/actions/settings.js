export const SET_THEME = 'SET_THEME';

export const setTheme = (chosenTheme) => {
    return {type: SET_THEME, theme: chosenTheme};
};