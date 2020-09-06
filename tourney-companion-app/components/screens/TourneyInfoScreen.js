import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { DeepBlue } from '../../constants/Colors';
import SimpleButton from '../UI/SimpleButton';
import { API } from '../../misc/apiCalls';
import { insertUserData, fetchAllUserData } from '../../misc/db'

Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldSetBadge: true,
                shouldShowAlert: true
            };
        }
    });

const TourneyInfoScreen = props => {


    // runs only on first render
    useEffect(() => {

        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            // what to do when notif received while app in running in background
            console.log(response);
        })

        const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
            // notification here contains all the content set to it including data
            console.log(notification);

        });

        return () => {
            foregroundSubscription.remove();
            backgroundSubscription.remove();
        };
    }, []);

    
    
    

    const tourney = useSelector(state => state.tournaments.activeTournament);

    // example...
    const triggerNotificationExample = () => {

        // use this to send a push notification to the TO

        /*
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: '',//TO token here (get from firebase)
                data: {stuff: 'stuffs'}, // score data
                title: 'New score reported!',
                body: 'player1: won 2-0 versus player2' // cute message
            })
        });
        */

        // example for local notification
        
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'My first local notif!',
                body: 'whaddup',
                data: {
                    //whatever i want here
                }
            },
            trigger: {
                seconds: 10,
            }
        });
        
    };

    const useLocalDbExample = async () => {
        /*
        const dbResult = await insertUserData("notarealapikey", "notarealaccountname");
        console.log(dbResult);
        console.log('new addition to db: '+ dbResult.insertId);
        */
        const dbResult = await fetchAllUserData();
        console.log(dbResult.rows._array[0].apikey);
    }


    return(
        <View style={styles.screen}>
            <Text style={{color: DeepBlue.primary_light}}>Tourney Info Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon, but not that soon ya know!</Text>
            <SimpleButton onPress={() => {
                if(tourney){
                    API._registerTourney(tourney.tid).then(result => {
                        console.log("id: "+result.payloadData.id +"& tid: "+result.payloadData.tid);
                    });
                }
            }}>Register tourney in DB</SimpleButton>
            <SimpleButton onPress={useLocalDbExample}>add dummy apikey to sqlite db</SimpleButton>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    }
});

export default TourneyInfoScreen;