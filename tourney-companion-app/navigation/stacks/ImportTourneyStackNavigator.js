import { createAppContainer, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ImportTourneyScreen from '../../components/screens/ImportTourneyScreen';
import { DeepBlue } from '../../constants/Colors';

const ImportTourneyStackNavigator = createStackNavigator({
    ImportTourneyScreen: ImportTourneyScreen
}, {
    defaultNavigationOptions: {
        title: 'Join New Tourney',
        headerStyle: {
            backgroundColor: DeepBlue.bg_secondary
        },
        headerTintColor: DeepBlue.text_primary
    }
});






export default createAppContainer(ImportTourneyStackNavigator);