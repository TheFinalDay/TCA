import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import TourneyTabNavigator from '../tabs/TourneyTabNavigator';
import TOScreensNavigator from '../stacks/TOScreensNavigator';
import ImportTourneyScreen from '../../components/screens/ImportTourneyScreen';
import TourneyListScreen from '../../components/screens/TourneyListScreen';
import { DeepBlue } from '../../constants/Colors';

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
    TOScreens: {
        screen: TOScreensNavigator,
        navigationOptions: {
            drawerLabel: 'T.O. Accounts'
        }
    }
    
},{
    contentOptions: {
        activeTintColor: DeepBlue.primary
    }
});

export default createAppContainer(MainNavigator);