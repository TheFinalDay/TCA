import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TOAccountScreen = props => {

    const UserAccountItem = props => {
        
        return(
            <Text color={DeepBlue.bg_secondary}>placeholder</Text>
        );
    }


    return(
        <View style={styles.screen}>
            <Text style={{color: DeepBlue.primary_light}}>TO Accounts Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon!</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("TOLogin");
            }}>
                <Text style={{color: DeepBlue.primary_light}}>navigate to TOLoginScreen...</Text>
            </TouchableOpacity>
        </View>
    );

}

TOAccountScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Challonge Accounts',
        headerLeft: () =>
            <TouchableOpacity style={{marginLeft: 36 * ratio}} onPress={()=>{navigation.toggleDrawer()}}>
                <MaterialCommunityIcons name={'forwardburger'} size={85 * ratio} color={'white'} />
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: DeepBlue.bg_primary
    }
});

export default TOAccountScreen;