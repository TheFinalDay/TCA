import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import TourneyTabNavigator from '../tabs/TourneyTabNavigator';
import ImportTourneyScreen from '../../components/screens/ImportTourneyScreen';

const MainNavigator = createDrawerNavigator({
    CurrentTourney: {
        screen: TourneyTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Import: {
        screen: ImportTourneyScreen,
        navigationOptions: {
            drawerLabel: 'Import'
        }
    },
    
    /** TODO: add the other drawer options...
    ,
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: 'Filters'
        }
    }

    */
}, {
    contentOptions: {
        labelStyle: {
            fontFamily: 'prototype'
        }
    }
})



export default createAppContainer(MainNavigator);