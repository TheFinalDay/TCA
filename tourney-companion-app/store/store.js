import { createStore, combineReducers } from 'redux';

import settingsReducer from './reducers/settings';
import tournamentsReducer from './reducers/tournaments';



const rootReducer = combineReducers({
    settings: settingsReducer,
    tournaments: tournamentsReducer
  });
const store = createStore(rootReducer);

export default store;