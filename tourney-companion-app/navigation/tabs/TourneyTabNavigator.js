import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardScreen from '../../components/screens/DashboardScreen';
import ScoreFeedScreen from '../../components/screens/ScoreFeedScreen';
import TourneyInfoScreen from '../../components/screens/TourneyInfoScreen';
import { DeepBlue } from '../../constants/Colors';

const tabScreenConfig = {
    ScoreFeed: {screen: ScoreFeedScreen, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (<MaterialCommunityIcons name='message-text' size={25} color='white' />);
        }

    }},
    Dashboard: {screen: DashboardScreen, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (<MaterialCommunityIcons name='bulletin-board' size={25} color='white' />);
        }
        
    }},
    TourneyInfo: {screen: TourneyInfoScreen, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (<MaterialCommunityIcons name='information' size={25} color='white' />);
        }

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
            backgroundColor: DeepBlue.bg_secondary
        }
    }
);

export default createAppContainer(TourneyTabNavigator);