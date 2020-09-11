import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

import { DeepBlue } from '../../constants/Colors';

const PopUp = props => {
    
    return(
        
        <Modal animationType="fade" transparent={true} visible={props.visible} onRequestClose={props.onRequestClose}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{...styles.modal_clickableView, flex: props.topFlex || 1}}>
                    <TouchableWithoutFeedback onPress={() => {setScoreModalVisible(false)}}>
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{...styles.modal_nonClickableView, flex: props.contentFlex || 3}}>
                    <View style={{...styles.modal_container, backgroundColor: props.backgroundColor || DeepBlue.text_primary, borderColor: props.borderColor || DeepBlue.text_primary}}>
                        {props.children}
                    </View>
                </View>
                <View style={{...styles.modal_clickableView, flex: props.bottomFlex || 3}}>
                    <TouchableWithoutFeedback onPress={() => {setScoreModalVisible(false)}}>
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    modal_nonClickableView: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal_clickableView: {
        width: '100%',
        height: '100%'
    },
    modal_container: {
        width: '80%',
        height: '70%', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        borderRadius: 20,
        borderWidth: 3,
        overflow: 'hidden'
    }
    
});

export default PopUp;