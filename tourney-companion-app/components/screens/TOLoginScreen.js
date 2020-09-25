import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { DeepBlue } from '../../constants/Colors';
import SimpleButton from '../UI/SimpleButton';
import PopUp from '../UI/PopUp';
import { API } from '../../misc/apiCalls';
import { insertUserData } from '../../misc/db';
import * as UDActions from '../../store/actions/userdata';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TOLoginScreen = props => {

    const dispatch = useDispatch();

    const [nameText, onChangeNameText] = useState('');
    const [keyText, onChangeKeyText] = useState('');
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [keyModalVisible, setKeyModalVisible] = useState(false);
    const [fieldEmptyError, setFieldEmptyError] = useState([false, false]);
    const [keyInvalidModalVisible, setKeyInvalidModalVisible] = useState(false);
    const [keyExistingModalVisible, setKeyExistingModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const insertUserDataHandler = () => {

        let keyInvalid = keyText.length != 40;
        let nameInvalid = nameText == '';

        if(!keyInvalid && !nameInvalid){
            setFieldEmptyError([false, false]);

            setIsLoading(true);
            API._getUserTournaments(keyText)
                .then(result => {
                    setIsLoading(false);
                    let status = result.payloadData.status;
                    if(status==200){
                        console.log("key is validated");
                        insertUserData(keyText, nameText)
                            .then(() => {
                                dispatch(UDActions.createUserData(nameText, keyText));
                                props.navigation.goBack();
                            })
                            .catch(err => {
                                console.log("problem when adding to db");
                                if(err.toString().includes("UNIQUE constraint")){
                                    setKeyExistingModalVisible(true);
                                } else {
                                    throw err;
                                }
                            })
                        
                    } else {
                        console.log("key is not validated")
                        setKeyInvalidModalVisible(true);
                    }
                })
                .catch(err => {
                    console.log("problem when validating key");
                    throw err;
                });

        } else {
            setFieldEmptyError([nameInvalid, keyInvalid]);
        }
        
    }

    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            <PopUp 
                visible={keyInvalidModalVisible} 
                onClose={() => {setKeyInvalidModalVisible(false)}}
                onPress={() => {setKeyInvalidModalVisible(false)}}
                topFlex={1}
                contentFlex={3.5}
                bottomFlex={3}
                title={"API Key Invalid"}>
                    <Text style={{color: DeepBlue.text_primary, fontFamily: 'prototype', fontSize: 36 * ratio}}>
                        The API Key you've entered doesn't match any existing Challonge account.{"\n\n"}
                        Make sure that you've entered it correctly, that there's no missing characters or that you haven't accidentally generated a new API Key.
                    </Text>
            </PopUp>
            <PopUp 
                visible={keyExistingModalVisible} 
                onClose={() => {setKeyExistingModalVisible(false)}}
                onPress={() => {setKeyExistingModalVisible(false)}}
                topFlex={1}
                contentFlex={2}
                bottomFlex={3}
                title={"Existing API Key"}>
                    <Text style={{color: DeepBlue.text_primary, fontFamily: 'prototype', fontSize: 36 * ratio}}>
                        The API Key you've entered is already saved onto this device's local memory.
                    </Text>
            </PopUp>
            <PopUp 
                visible={nameModalVisible} 
                onClose={() => {setNameModalVisible(false)}}
                onPress={() => {setNameModalVisible(false)}}
                topFlex={1}
                contentFlex={2.5}
                bottomFlex={3}
                title={"About the Account Name..."}>
                    <Text style={{color: DeepBlue.text_primary, fontFamily: 'prototype', fontSize: 36 * ratio}}>
                        Can be any name you want!{"\n\n"}
                        Doesn't necessarily need to be the same name as your account's username.
                    </Text>
            </PopUp>
            <PopUp 
                visible={keyModalVisible} 
                onClose={() => {setKeyModalVisible(false)}}
                onPress={() => {setKeyModalVisible(false)}}
                topFlex={0.5}
                contentFlex={10}
                bottomFlex={1}
                title={"About the API Key..."}>
                    <Text style={{color: DeepBlue.text_primary, fontFamily: 'prototype', fontSize: 36 * ratio}}>
                        In order to find your API Key, log into your Challonge account and go to{"\n"}
                        <Text style={{color: DeepBlue.primary_light}}>Settings {">"} Developer API</Text>{"\n"}
                        On that page, if not done already, generate a new API Key (a case sensitive 40 character long string of letters and digits), and copy and paste it here!{"\n\n"}
                        <Text style={{color: DeepBlue.gold_light}}>IMPORTANT{"\n"}
                        Do not share this API Key with anyone you wouldn't share your account's password with.
                        The API key wields all the power of your account.</Text>{"\n\n"}
                        To help ensure the safety of your Challonge account, this app will only store your API Key information locally on your device's internal memory.
                    </Text>
            </PopUp>
            <View style={styles.screen}>

                <View style={{flexDirection: 'row', width: '100%', height: '9%', justifyContent: 'center', marginTop: 36 * ratio}}>
                    <View style={{flex: 6, alignItems: 'flex-start', justifyContent: 'space-around', backgroundColor: DeepBlue.bg_secondary, marginLeft: 25 * ratio, paddingLeft: 47 * ratio, paddingVertical: 12 * ratio, borderRadius: 47 * ratio, borderWidth: 3, borderColor: fieldEmptyError[0] ? DeepBlue.red : DeepBlue.bg_secondary}}>
                        <Text style={{fontFamily: 'prototype', fontSize: 43 * ratio, color: DeepBlue.text_primary}}>Name:</Text>
                        <TextInput
                            style={{height: 97 * ratio, color: DeepBlue.text_primary, borderColor: DeepBlue.bg_tertiary, borderBottomWidth: 3, marginBottom: 10 * ratio, width: '95%', fontSize: 34 * ratio}}
                            placeholder="Enter a name for this account..."
                            placeholderTextColor={DeepBlue.text_secondary}
                            onChangeText={text => onChangeNameText(text)}
                            value={nameText}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {setNameModalVisible(true)}}>
                            <MaterialCommunityIcons name={'information-outline'} size={85 * ratio} color={DeepBlue.primary_light} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{flexDirection: 'row', width: '100%', height: '9%', justifyContent: 'center', marginTop: 36 * ratio}}>
                    <View style={{flex: 6, alignItems: 'flex-start', justifyContent: 'space-around', backgroundColor: DeepBlue.bg_secondary, marginLeft: 25 * ratio, paddingLeft: 47 * ratio, paddingVertical: 12 * ratio, borderRadius: 47 * ratio, borderWidth: 3, borderColor: fieldEmptyError[1] ? DeepBlue.red : DeepBlue.bg_secondary}}>
                        <Text style={{fontFamily: 'prototype', fontSize: 43 * ratio, color: DeepBlue.text_primary}}>API Key:</Text>
                        <TextInput
                            style={{height: 97 * ratio, color: DeepBlue.text_primary, borderColor: DeepBlue.bg_tertiary, borderBottomWidth: 3, marginBottom: 10 * ratio, width: '95%', fontSize: 29 * ratio}}
                            placeholder="Enter your API key (case sensitive)..."
                            placeholderTextColor={DeepBlue.text_secondary}
                            onChangeText={text => onChangeKeyText(text)}
                            value={keyText}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {setKeyModalVisible(true)}}>
                            <MaterialCommunityIcons name={'information-outline'} size={85 * ratio} color={DeepBlue.primary_light} />
                        </TouchableOpacity>
                    </View>
                </View>

                <SimpleButton 
                        style={styles.saveAccountButton}
                        backgroundColor={isLoading ? DeepBlue.text_secondary : DeepBlue.primary}
                        onPress={isLoading ? () => {} : insertUserDataHandler}>
                        {isLoading ? "Validating..." : "Save Account"}
                    </SimpleButton>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_primary
    },
    saveAccountButton: {
        marginTop: 36 * ratio,
        width: '95%',
    }
});

TOLoginScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'New Account',
    }
}

export default TOLoginScreen;