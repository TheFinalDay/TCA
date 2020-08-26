import React from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');

const DashboardHeader = props => {
    
    //TODO 
    // Refresh functionnality onPress
    // Add more icons (trusted icon & TO registered icon) on banner


    return(
        <View style={styles.dashboardHeader}>
            <View style={styles.header}>
                <TouchableOpacity style={{...styles.drawericonButton, flex: 2}} onPress={props.openDrawer}>
                    <MaterialCommunityIcons name={props.iconName || 'forwardburger'} size={props.iconSize || 35} color={props.iconColor || 'white'} />
                </TouchableOpacity>
                    <Text style={{...styles.headerText, flex: 17}}>Dashboard</Text>
                <TouchableOpacity style={{...styles.refreshIconButton, flex: 2}} onPress={() => {/* TODO */}}>
                    <MaterialCommunityIcons name={'refresh'} size={props.iconSize || 35} color={props.iconColor || 'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.banner}>
                <Text numberOfLines={1} style={{...styles.bannerText, flex: 7}}>{props.children}</Text>
                <View style={{...styles.bannerIcons, flex: 2}}></View>
            </View>
            
        </View>
    );
}


const styles = StyleSheet.create({
    dashboardHeader: {
        width: '100%',
    },
    header: {
        backgroundColor: DeepBlue.bg_secondary,
        height:  dims.height * 0.055,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 17,
        marginLeft: 15,
        marginVertical: 15
    },
    drawericonButton: {
        marginLeft: 15,
        alignItems: 'flex-start'
    },
    refreshIconButton: {
        marginRight: 10,
        alignItems: 'flex-end'
    },
    banner: {
        backgroundColor: DeepBlue.bg_tertiary,
        height:  dims.height * 0.04,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    bannerText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 16,
        marginLeft: 12,
        marginVertical: 15,
        flex: 8
    },
    bannerIcons: {

    }
});

export default DashboardHeader;