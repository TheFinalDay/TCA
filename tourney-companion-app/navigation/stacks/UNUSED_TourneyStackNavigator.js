import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TourneyTabNavigator from '../tabs/TourneyTabNavigator';
import { DeepBlue } from '../../constants/Colors';

const TourneyStackNavigator = createStackNavigator({
    TourneyTabs: TourneyTabNavigator
});

TourneyStackNavigator.navigationOptions = {
    headerStyle: {
        backGroundColor: DeepBlue.bg_secondary
    },
    headerTintColor: DeepBlue.text_primary
}

export default createAppContainer(TourneyStackNavigator);
