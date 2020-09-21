import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardScreen from '../../components/screens/DashboardScreen';
import ScoreFeedScreen from '../../components/screens/ScoreFeedScreen';
import TourneyInfoScreen from '../../components/screens/TourneyInfoScreen';
import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const tabScreenConfig = {
    ScoreFeed: {
        screen: ScoreFeedScreen, 
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (<MaterialCommunityIcons name='message-text' size={60 * ratio} color='white' />);
            }
        }
    },
    Dashboard: {
        screen: DashboardScreen, 
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (<MaterialCommunityIcons name='bulletin-board' size={60 * ratio} color='white' />);
            }
        }
    },
    TourneyInfo: {
        screen: TourneyInfoScreen, 
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (<MaterialCommunityIcons name='information' size={60 * ratio} color='white' />);
            }
        }
    }
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
        initialRouteName: 'Dashboard',
        activeTintColor: 'white',
        labeled: false,
        shifting: false,
        barStyle:{
            backgroundColor: DeepBlue.bg_secondary
        }
    }
);

export default createAppContainer(TourneyTabNavigator);