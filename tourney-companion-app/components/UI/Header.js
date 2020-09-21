import React from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const Header = props => {
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.drawericonButton} onPress={props.openDrawer}>
                <MaterialCommunityIcons name={props.iconName || 'forwardburger'} size={props.iconSize || 85 * ratio} color={props.iconColor || 'white'} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{props.children}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    
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
        fontSize: 52 * ratio,
        marginLeft: 36 * ratio,
        marginVertical: 36 * ratio
    },
    drawericonButton: {
        marginLeft: 36 * ratio
    }
});

export default Header;