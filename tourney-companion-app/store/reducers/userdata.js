import UserData from '../../models/userdata';
import { CREATE_UD } from '../actions/userdata';
import { DELETE_UD } from '../actions/userdata';
import { SET_UD } from '../actions/userdata';

const initialState = {
    userDatas: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CREATE_UD:

            const addedUD = action.userData;

            const createUDName = addedUD.name;
            const createUDKey = addedUD.apikey;

            const newOrUpdatedUD = new UserData(
                createUDName,
                createUDKey
            );

            if(state.userDatas.find(ud => ud.apikey === createUDKey)){
                // UD already exists in store
                console.log("userdata update...");
                let filteredArray = state.userDatas.filter(ud => ud.apikey !== createUDKey);
                return {
                    ...state,
                    userDatas: [ ...filteredArray, newOrUpdatedUD]
                };

            } else {
                // first time UD is added
                console.log("new userdata added...");
                return {
                    ...state,
                    userDatas: [ ...state.userDatas, newOrUpdatedUD]
                };
            }

        case DELETE_UD:

            //TODO handle when UD is removed while it's dashboard is active

            let filteredArray = state.userDatas.filter(ud => ud.apikey !== action.apikey);

            return {
                ...state,
                userDatas: filteredArray
            };

        case SET_UD:

            return {
                userDatas: action.userDatas
            };

        default:
            return state;
    }

};