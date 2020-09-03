import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * RectangleIconButton
 * Simple icon button with no border radius
 * 
 * @param {iconName} props Button icon name (MaterialCommunityIcons). see: https://icons.expo.fyi/
 * @param {onPress} props OnPress function.
 * @param {children} props Optional. Text on button, to the left of icon.
 * @param {style} props Optional. Styles to add to wrapping TouchableOpacity.
 * @param {backgroundColor} props Optional. Button background color, default is white.
 * @param {borderWidth} props Optional. Button border width, default is 0.
 * @param {borderColor} props Optional. Button border color, default is black.
 * @param {textColor} props Optional. Button text color, default is black.
 * @param {fontSize} props Optional. Button text font size, default is 16.
 * @param {iconSize} props Optional. Button icon size, default is 20.
 * @param {iconColor} props Optional. Button icon color, default is black.
 */
const RectangleIconButton = props => {

    const isText = props.children;

    return (
        <TouchableOpacity onPress={props.onPress} style={{...props.style, ...styles.buttonContainer}}>
            <View style={{...styles.button, backgroundColor: props.backgroundColor || 'white', borderWidth: props.borderWidth || 0, borderColor: props.borderColor || 'black'}}>
                {isText && <Text style={{...styles.buttonText, color: props.textColor || 'black', fontSize: props.fontSize || 16}}>{props.children}</Text>}
                <View>
                    <MaterialCommunityIcons name={props.iconName} size={props.iconSize || 20} color={props.iconColor || 'black'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: 'hidden'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 0
    },
    buttonText: {
        marginRight: 5,
        fontFamily: 'prototype',
        textAlign: 'center'
    }
});

export default RectangleIconButton;