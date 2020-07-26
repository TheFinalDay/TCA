import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import TourneyTabNavigator from '../tabs/TourneyTabNavigator';
import ImportTourneyScreen from '../../components/screens/ImportTourneyScreen';

const MainNavigator = createDrawerNavigator({
    Import: {
        screen: ImportTourneyScreen,
        navigationOptions: {
            drawerLabel: 'Join New Tourney'
        }
    },
    CurrentTourney: {
        screen: TourneyTabNavigator,
        navigationOptions: {
            drawerLabel: 'Active Dashboard'
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
}, 
    {
        contentOptions: {
            labelStyle: {
                fontFamily: 'prototype'
            }
        }
    }

)

export default createAppContainer(MainNavigator);