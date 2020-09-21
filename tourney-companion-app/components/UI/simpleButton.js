import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const SimpleButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...props.style, ...styles.buttonContainer}}>
            <View style={{...styles.button, backgroundColor: props.backgroundColor || 'white', borderWidth: props.borderWidth || 0, borderColor: props.borderColor || 'black'}}>
                <Text style={{...styles.buttonText, color: props.textColor || 'black', fontSize: props.fontSize || 39 * ratio}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: 'hidden'
    },
    button: {
        padding: 25 * ratio,
        borderRadius: 25 * ratio
    },
    buttonText: {
        fontFamily: 'prototype',
        textAlign: 'center'
    }
});

export default SimpleButton;