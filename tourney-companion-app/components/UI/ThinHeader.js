import React from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const ThinHeader = props => {
    
    return(
        <View style={styles.header}>
            <TouchableOpacity style={{...styles.drawericonButton, flex: 2}} onPress={props.openDrawer}>
                <MaterialCommunityIcons name={props.iconName || 'forwardburger'} size={props.iconSize || 85 * ratio} color={props.iconColor || 'white'} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={{...styles.headerText, flex: 17}}>{props.children}</Text>
            {props.refresh &&<TouchableOpacity style={{...styles.refreshIconButton, flex: 2}} onPress={props.refresh}>
                <MaterialCommunityIcons name={'refresh'} size={props.iconSize || 85 * ratio} color={props.iconColor || 'white'} />
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
        fontSize: 41 * ratio,
        marginLeft: 36 * ratio,
        marginVertical: 36 * ratio
    },
    drawericonButton: {
        marginLeft: 36 * ratio,
        alignItems: 'flex-start'
    },
    refreshIconButton: {
        marginRight: 25 * ratio,
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
        fontSize: 39 * ratio,
        marginLeft: 29 * ratio,
        marginVertical: 36 * ratio
    }
});

export default ThinHeader;