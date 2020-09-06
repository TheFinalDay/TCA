import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import TourneyTabNavigator from '../tabs/TourneyTabNavigator';
import ImportTourneyScreen from '../../components/screens/ImportTourneyScreen';
import TourneyListScreen from '../../components/screens/TourneyListScreen';
import TOAccountScreen from '../../components/screens/TOAccountScreen';

const MainNavigator = createDrawerNavigator({
    CurrentTourney: {
        screen: TourneyTabNavigator,
        navigationOptions: {
            drawerLabel: 'Active Dashboard'
        }
    },
    TourneyList: {
        screen: TourneyListScreen,
        navigationOptions: {
            drawerLabel: 'My Tourneys'
        }
    },
    Import: {
        screen: ImportTourneyScreen,
        navigationOptions: {
            drawerLabel: 'Join as Player'
        }
    },
    TOAccount: {
        screen: TOAccountScreen,
        navigationOptions: {
            drawerLabel: 'TO Accounts'
        }
    }
    
    
    
    
    /** TODO: add the other drawer options...
    ,
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: 'Filters'
        }
    }

    */
});

export default createAppContainer(MainNavigator);