import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Header = props => {
    return(
        <View style={styles.header}>
            <Text style={styles.headertitle}>{props.title}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        paddingTop: '13%',
        backgroundColor: '#00ffbb'
    },
    headertitle: {
        fontSize: 30,
        fontFamily: 'prototype'
    }
});

export default Header;