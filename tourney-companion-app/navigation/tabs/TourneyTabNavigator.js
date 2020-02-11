import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardScreen from '../../components/screens/DashboardScreen';
import store from '../../store/store';

const state = store.getState();

const tabScreenConfig = {
    Dashboard: {screen: DashboardScreen, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (<MaterialCommunityIcons name='bulletin-board' size={25} color='white' />);
        },
        tabBarColor: state.settings.theme.bg_secondary
        
    }}
    /**  TODO: add the rest of my content (in this order) 
     *      -> TourneyDetails, ScoreFeed, (Dashboard), ManageStations, BracketViewer
    
    ,
    Favorites: {screen: FavNavigator, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>);
        },
        tabBarColor: Colors.accent
    }}

    */
}

const TourneyTabNavigator = createMaterialBottomTabNavigator(
    tabScreenConfig,
    {
        activeTintColor: 'white',
        labeled: false,
        shifting: false,
        barStyle:{
            backgroundColor: state.settings.theme.bg_secondary
        }
    }
);


export default TourneyTabNavigator;