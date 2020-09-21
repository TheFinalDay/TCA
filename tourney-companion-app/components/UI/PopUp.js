import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';

import { DeepBlue } from '../../constants/Colors';
import RectangleIconButton from '../UI/RectangleIconButton';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const PopUp = props => {

    let isSubtitle = props.isSubtitle || false;
    let isSecondaryButton = props.isSecondaryButton || false;
    
    return(
        
        <Modal animationType="fade" transparent={true} visible={props.visible} onRequestClose={props.onClose} onShow={props.onShow}>
            <View style={{overflow: 'hidden', flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{...styles.modal_clickableView, flex: props.topFlex || 1}}>
                    <TouchableWithoutFeedback onPress={props.onClose}>
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{...styles.modal_nonClickableView, flex: props.contentFlex || 3}}>
                    <View style={{...styles.modal_container, backgroundColor: DeepBlue.bg_primary, borderColor: DeepBlue.bg_secondary}}>
                        <View style={{width: '100%', height: 126 * ratio, backgroundColor: DeepBlue.bg_secondary, paddingHorizontal: 25 * ratio, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'prototype', color: DeepBlue.text_primary, fontSize: 43 * ratio}}>{props.title || "Notice"}</Text>
                        </View>
                        {isSubtitle && <View style={{width: '100%', height: 112 * ratio, backgroundColor: DeepBlue.bg_tertiary, paddingHorizontal: 25 * ratio, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', fontFamily: 'prototype', color: DeepBlue.text_primary}}>{props.subtitle}</Text>
                        </View>}
                        <View style={{...props.style, width: '100%', flex: 1, backgroundColor: DeepBlue.bg_primary, paddingHorizontal: 25 * ratio, justifyContent: 'center', alignItems: 'center'}}>
                            {props.children}
                        </View>
                        <View style={{width: '100%', height: 139 * ratio, backgroundColor: DeepBlue.bg_secondary, justifyContent: 'space-between', overflow: 'hidden'}}>
                            <View style={{height: '100%', flexDirection: 'row', justifyContent: 'space-evenly', borderTopWidth: 3, borderColor: DeepBlue.bg_secondary}}>
                                <RectangleIconButton
                                    onPress={isSecondaryButton ? props.secondaryOnPress : props.onPress}
                                    style={{flex: 1, height: '100%'}}
                                    fontSize={44 * ratio}
                                    backgroundColor={isSecondaryButton ? (props.secondaryButtonColor || DeepBlue.red) : (props.buttonColor || DeepBlue.primary)}
                                    textColor={isSecondaryButton ? (props.secondaryButtonTextColor || DeepBlue.text_primary) : (props.buttonTextColor || DeepBlue.text_primary)}>
                                    {isSecondaryButton ? (props.secondaryButtonText || "Cancel") : (props.buttonText || "OK")}
                                </RectangleIconButton>
                                {isSecondaryButton && <View style={{flex: 2, borderLeftWidth: 3, borderColor: DeepBlue.bg_secondary}}>
                                    <RectangleIconButton
                                        onPress={props.onPress}
                                        style={{height: '100%'}}
                                        fontSize={44 * ratio}
                                        backgroundColor={props.buttonColor || DeepBlue.primary}
                                        textColor={props.buttonTextColor || DeepBlue.text_primary}>
                                        {props.buttonText || "Submit"}
                                    </RectangleIconButton>
                                </View>}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{...styles.modal_clickableView, flex: props.bottomFlex || 3}}>
                    <TouchableWithoutFeedback onPress={() => {props.onClose()}}>
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
        borderRadius: 47 * ratio,
        borderWidth: 3,
        overflow: 'hidden'
    }
    
});

export default PopUp;