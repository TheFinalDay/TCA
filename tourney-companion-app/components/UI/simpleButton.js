import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const SimpleButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...props.style, ...styles.buttonContainer}}>
            <View style={{...styles.button, backgroundColor: props.backgroundColor || 'white', borderWidth: props.borderWidth || 0, borderColor: props.borderColor || 'black'}}>
                <Text style={{...styles.buttonText, color: props.textColor || 'black', fontSize: props.fontSize || 16}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: 'hidden'
    },
    button: {
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: 'prototype',
        textAlign: 'center'
    }
});

export default SimpleButton;