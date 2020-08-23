import React from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');

const Header = props => {
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.drawericonButton} onPress={props.openDrawer}>
                <MaterialCommunityIcons name={props.iconName || 'forwardburger'} size={props.iconSize || 35} color={props.iconColor || 'white'} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{props.children}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    /*
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
    */

    header: {
        width: '100%',
        backgroundColor: DeepBlue.bg_secondary,
        height:  dims.height * 0.07,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 22,
        marginLeft: 15,
        marginVertical: 15
    },
    drawericonButton: {
        marginLeft: 15
    }
});

export default Header;