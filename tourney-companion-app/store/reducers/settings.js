import { DeepBlue, MGC } from '../../constants/Colors';
import { SET_THEME } from '../actions/settings';

const initialState = {
    theme: DeepBlue
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            const chosenTheme = action.theme;
            return {...state, theme: chosenTheme};
        default:
            return state;
    }
    
}

export default settingsReducer;
