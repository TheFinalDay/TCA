import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tcauser.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `CREATE TABLE IF NOT EXISTS 
                userData 
                    (
                        apikey TEXT PRIMARY KEY NOT NULL,
                        name TEXT NOT NULL
                    )`, 
            [], // dynamic arguments if necessary
            () => { // success function
                resolve();
            },
            (_, err) => { // failure function
                reject(err);
            });
        });
    });

    return promise;
};

export const insertUserData = (apikey, name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `INSERT INTO 
                userData(apikey, name)
                VALUES(?,?)`, 
            [apikey, name], // dynamic arguments if necessary
            (_, result) => { // success function
                resolve(result);
            },
            (_, err) => { // failure function
                reject(err);
            });
        });
    });

    return promise;
};

export const fetchAllUserData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `SELECT * FROM userData`, 
            [], // dynamic arguments if necessary
            (_, result) => { // success function
                resolve(result);
            },
            (_, err) => { // failure function
                reject(err);
            });
        });
    });

    return promise;
}

export const dropUserData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `DROP TABLE userData`, 
            [], // dynamic arguments if necessary
            (_, result) => { // success function
                resolve(result);
            },
            (_, err) => { // failure function
                reject(err);
            });
        });
    });

    return promise;
}