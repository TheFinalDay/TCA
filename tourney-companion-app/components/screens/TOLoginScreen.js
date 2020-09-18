import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { DeepBlue } from '../../constants/Colors';

const TOLoginScreen = props => {


    return(
        <View style={styles.screen}>
            <Text style={{color: DeepBlue.primary_light}}>TO Login Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon!</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    }
});

TOLoginScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Login',
    }
}

export default TOLoginScreen;