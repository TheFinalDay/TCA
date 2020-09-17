import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const Banner = props => {
    
    return(
        
        <View style={{
            ...props.style,
            ...styles.banner, 
            backgroundColor: props.color || DeepBlue.accent, 
            maxWidth: props.maxWidth || dims.width, 
            borderColor: props.textColor || DeepBlue.text_primary,
            borderWidth: props.borderWidth || 0
            }}>
            <Text numberOfLines={1} style={{...styles.bannerText, color: props.textColor || DeepBlue.text_primary, fontSize: props.fontSize || 34 * ratio}}>{props.children}</Text>
        </View>
            
    );
}


const styles = StyleSheet.create({
    
    banner: {
        height:  dims.height * 0.035,
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomLeftRadius: 25 * ratio,
        borderTopRightRadius: 25 * ratio
    },
    bannerText: {
        fontFamily: 'prototype',
        color: DeepBlue.text_primary,
        marginHorizontal: 29 * ratio,
        marginVertical: 29 * ratio
    }
});

export default Banner;