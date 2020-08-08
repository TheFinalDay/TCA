import React from 'react';
import { useSelector } from "react-redux";
import { Text, StyleSheet, View } from 'react-native';



const DashboardScreen = props => {

    const theme = useSelector(state => state.settings.theme);

    return(
        <View style={{...styles.screen, backgroundColor: theme.bg_primary}}>
            <Text style={{...styles.text, color: theme.text_primary}}>Dashboard Screen</Text>
            <Text style={{...styles.text3, color: theme.text_secondary}}>text_secondary</Text>
            <Text style={{...styles.text1, color: theme.primary}}>primary</Text>
            <Text style={{...styles.text2, color: theme.accent}}>accent</Text>
            
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    text: {
        fontFamily: 'prototype'
    },
    text1: {
        fontFamily: 'prototype'
    },
    text2: {
        fontFamily: 'prototype'
    },
    text3: {
        fontFamily: 'prototype'
    }
});


export default DashboardScreen;