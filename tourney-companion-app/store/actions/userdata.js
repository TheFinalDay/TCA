export const CREATE_UD = 'CREATE_UD';
export const DELETE_UD = 'DELETE_UD';

export const createUserData = (newId, newName, newKey) => {

    console.log('creating/updating: ' + newKey)
    let data = {
        id: newId,
        name: newName,
        key: newKey
    }
    return { type: CREATE_UD, userData: data}

};

export const deleteUserData = (keyToDelete) => {

    console.log('deleting: ' + keyToDelete);
    return { type: DELETE_UD, key: tourneyId }

};