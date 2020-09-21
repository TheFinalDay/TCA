import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TopPaddingBar = props => {

    return(
        <View style={{...styles.statusBarBackground, ...props.style}}></View>
    );
}


const styles = StyleSheet.create({
    
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 85 * ratio : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: DeepBlue.bg_secondary,
    },
});

export default TopPaddingBar;