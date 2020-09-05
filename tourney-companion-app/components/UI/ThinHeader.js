import React from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';


const dims = Dimensions.get('window');

const ThinHeader = props => {
    
    return(
        <View style={styles.header}>
            <TouchableOpacity style={{...styles.drawericonButton, flex: 2}} onPress={props.openDrawer}>
                <MaterialCommunityIcons name={props.iconName || 'forwardburger'} size={props.iconSize || 35} color={props.iconColor || 'white'} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={{...styles.headerText, flex: 17}}>{props.children}</Text>
            {props.refresh &&<TouchableOpacity style={{...styles.refreshIconButton, flex: 2}} onPress={props.refresh}>
                <MaterialCommunityIcons name={'refresh'} size={props.iconSize || 35} color={props.iconColor || 'white'} />
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
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
        marginVertical: 15
    }
});

export default ThinHeader;