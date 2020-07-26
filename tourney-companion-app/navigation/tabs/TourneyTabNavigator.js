import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardScreen from '../../components/screens/DashboardScreen';
import { DeepBlue } from '../../constants/Colors';

const tabScreenConfig = {
    Dashboard: {screen: DashboardScreen, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (<MaterialCommunityIcons name='bulletin-board' size={25} color='white' />);
        },
        tabBarColor: DeepBlue.bg_secondary
        
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