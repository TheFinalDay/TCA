import { createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import settingsReducer from './reducers/settings';
import tournamentsReducer from './reducers/tournaments';
import userdataReducer from './reducers/userdata';
import tourneycardsReducer from './reducers/tourneycards';

import { composeWithDevTools } from 'redux-devtools-extension';
//remove this import before deployment
//use like this: 
//// const store = createStore(rootReducer, composeWithDevTools());


const rootReducer = combineReducers({
    settings: settingsReducer,
    tournaments: tournamentsReducer,
    userdata: userdataReducer,
    tourneycards: tourneycardsReducer
  });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;