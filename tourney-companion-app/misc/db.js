import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tcauser.db');

//#region UserData table

export const initUserData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `CREATE TABLE IF NOT EXISTS 
                userData 
                    (
                        apikey TEXT PRIMARY KEY NOT NULL,
                        name TEXT NOT NULL
                    );`, 
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

export const dropUserDataRow = (apikey) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `DELETE FROM 
                userData 
            WHERE 
                apikey = ?`, 
            [apikey], // dynamic arguments if necessary
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
            `DROP TABLE userData;`, 
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

//#endregion

//#region tourneyCard

export const initTourneyCard = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `CREATE TABLE IF NOT EXISTS
                tourneyCard
                    (
                        tid TEXT PRIMARY KEY NOT NULL,
                        url TEXT NOT NULL,
                        tname TEXT NOT NULL,
                        tgame TEXT NOT NULL,
                        tplayers INTEGER NOT NULL,
                        ttype TEXT,
                        tdate TEXT NOT NULL,
                        pname TEXT NOT NULL
                    );`, 
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

export const updateTCPlayerName = (tid, pname) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `UPDATE tourneyCard
            SET pname = ?
            WHERE tid = ?`, 
            [pname, tid], // dynamic arguments if necessary
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

export const insertTourneyCard = (tid, url, tname, tgame, tplayers, ttype, tdate, pname) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `INSERT INTO 
                tourneyCard(tid, url, tname, tgame, tplayers, ttype, tdate, pname)
                VALUES(?,?,?,?,?,?,?,?)`, 
            [tid, url, tname, tgame, tplayers, ttype, tdate, pname], // dynamic arguments if necessary
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

export const fetchAllTourneyCard = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `SELECT * FROM tourneyCard`, 
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

export const dropTourneyCardRow = (tid) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `DELETE FROM 
                tourneyCard 
            WHERE 
                tid = ?`, 
            [apikey], // dynamic arguments if necessary
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

export const dropTourneyCard = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
            `DROP TABLE tourneyCard;`, 
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

//#endregion









