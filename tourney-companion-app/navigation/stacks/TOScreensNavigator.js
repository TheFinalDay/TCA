import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TOAccountScreen from '../../components/screens/TOAccountScreen';
import TOLoginScreen from '../../components/screens/TOLoginScreen';
import { DeepBlue } from '../../constants/Colors';



const TOScreensNavigator = createStackNavigator({
    TOAccount: { screen: TOAccountScreen },
    TOLogin: { screen: TOLoginScreen }
}, {
    defaultNavigationOptions: {
        headerTitleStyle: {
            fontFamily: 'prototype'
        },
        headerStyle: {
            backgroundColor: DeepBlue.bg_secondary
        },
        headerTintColor: DeepBlue.text_primary,
    }
});

TOScreensNavigator.navigationOptions = {

}


export default createAppContainer(TOScreensNavigator);