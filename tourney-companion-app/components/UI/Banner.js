import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');

const Banner = props => {
    
    return(
        
        <View style={{
            ...styles.banner, 
            backgroundColor: props.color || DeepBlue.accent, 
            maxWidth: props.maxWidth || dims.width, 
            borderColor: props.textColor || DeepBlue.text_primary,
            borderWidth: props.borderWidth || 0
            }}>
            <Text numberOfLines={1} style={{...styles.bannerText, color: props.textColor || DeepBlue.text_primary}}>{props.children}</Text>
        </View>
            
    );
}


const styles = StyleSheet.create({
    
    banner: {
        height:  dims.height * 0.035,
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        margin: 4
    },
    bannerText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        fontSize: 14,
        marginHorizontal: 12,
        marginVertical: 12
    }
});

export default Banner;