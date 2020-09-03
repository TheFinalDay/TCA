import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const TourneyInfoScreen = props => {


    return(
        <View style={styles.screen}>
            <Text style={{color: DeepBlue.primary_light}}>Tourney Info Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon, but not that soon ya know!</Text>
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

export default TourneyInfoScreen;