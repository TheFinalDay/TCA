export const CREATE_UD = 'CREATE_UD';
export const DELETE_UD = 'DELETE_UD';
export const SET_UD = 'SET_UD';

import { fetchAllUserData, dropUserDataRow } from '../../misc/db';

export const createUserData = (newId, newName, newKey) => {
    return async dispatch => {
    
        return dispatch({
            type: CREATE_UD,
            userData: {
                id: newId,
                name: newName,
                key: newKey
            }
        });
    };

};

export const deleteUserData = (keyToDelete) => {
    return async dispatch => {
        try{
            await dropUserDataRow(keyToDelete);
            dispatch({
                type: DELETE_UD,
                apikey: keyToDelete
            });
        } catch(err){
            throw err;
        }
    };

};

export const setUserData = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchAllUserData();
            dispatch({
                type: SET_UD,
                userDatas: dbResult.rows._array
            });
        } catch(err){
            throw err;
        }
        
    };
};