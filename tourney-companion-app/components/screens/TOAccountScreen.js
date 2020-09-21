import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';
import PopUp from '../UI/PopUp';
import * as UDActions from '../../store/actions/userdata';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TOAccountScreen = props => {

    const dispatch = useDispatch();

    const [keyModalVisible, setKeyModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const userDatas = useSelector(state => state.userdata.userDatas);

    useEffect(() => {
        // do stuff here??
    }, [userDatas])

    const setKeyModalVisibleHandler = (index) => {
        setCurrentIndex(index);
        setKeyModalVisible(true);
    }

    const setDeleteModalVisibleHandler = (index) => {
        setCurrentIndex(index);
        setDeleteModalVisible(true);
    }

    const deleteAccountHandler = () => {
        if(currentIndex!=null){
            console.log("deleting currentIndex: " + userDatas[currentIndex].name);
            dispatch(UDActions.deleteUserData(userDatas[currentIndex].apikey))
                .then(() => {
                    setDeleteModalVisible(false); 
                    setCurrentIndex(null);
                }).catch(err => {
                    setDeleteModalVisible(false); 
                    setCurrentIndex(null);
                    throw err;
                });
        } else {
            setDeleteModalVisible(false); 
            setCurrentIndex(null);
        }
    }
        
    
    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            {currentIndex!=null && <PopUp
                visible={deleteModalVisible} 
                isSecondaryButton={true}
                onClose={() => {setDeleteModalVisible(false); setCurrentIndex(null);}}
                buttonText={"Cancel"}
                onPress={() => {setDeleteModalVisible(false); setCurrentIndex(null);}}
                secondaryButtonText={"Delete"}
                secondaryOnPress={deleteAccountHandler}
                topFlex={1}
                contentFlex={3}
                bottomFlex={3}
                title={"Delete " + userDatas[currentIndex]?.name}>
                    <Text style={{color: DeepBlue.text_primary, fontFamily: 'prototype', fontSize: 36 * ratio, textAlign: 'center'}}>
                        Are you sure you want to delete this Account's key from your device?{"\n\n"}
                        <Text style={{color: DeepBlue.gold_light}}>You will have to re-type the API key if you change your mind later.</Text>
                    </Text>
            </PopUp>}
            {currentIndex!=null && <PopUp
                visible={keyModalVisible} 
                onClose={() => {setKeyModalVisible(false); setCurrentIndex(null);}}
                onPress={() => {setKeyModalVisible(false); setCurrentIndex(null);}}
                topFlex={1}
                contentFlex={2.5}
                bottomFlex={3}
                title={"View " + userDatas[currentIndex]?.name + " Key"}>
                    <Text style={{color: DeepBlue.primary_light, fontSize: 36 * ratio, textAlign: 'center'}}>
                        {userDatas[currentIndex]?.apikey}
                    </Text>
            </PopUp>}
            <View style={styles.screen}>
                <View style={styles.textview}>
                    <Text style={styles.infotext}>Link your Challonge account here to act as a TO in your own tournaments</Text>
                </View>
                {userDatas.length > 0 && <View style={styles.listsection}>
                    <FlatList
                        data={userDatas}
                        keyExtractor={ud => ud.apikey}
                        renderItem={itemData => 
                            <View style={styles.accountrow}>
                                <View style={styles.rowtextview}>
                                    <Text numberOfLines={1} style={styles.nametext}>{itemData.item.name}</Text>
                                </View>
                                <View style={styles.rowkeyview}>
                                    <TouchableOpacity style={styles.touchablekeybutton} onPress={()=>{setKeyModalVisibleHandler(itemData.index)}}>
                                        <Text style={styles.nametext}> View </Text>
                                        <MaterialCommunityIcons name={'shield-key-outline'} size={55 * ratio} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowdeleteview}>
                                    <TouchableOpacity style={{}} onPress={()=>{setDeleteModalVisibleHandler(itemData.index)}}>
                                        <MaterialCommunityIcons name={'trash-can-outline'} size={55 * ratio} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        }
                    />
                </View>}
            </View>
        </View>
        
    );

}

TOAccountScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Challonge Accounts',
        headerLeft: () =>
            <TouchableOpacity style={{marginLeft: 36 * ratio}} onPress={()=>{navigation.toggleDrawer()}}>
                <MaterialCommunityIcons name={'forwardburger'} size={85 * ratio} color={'white'} />
            </TouchableOpacity>,
        headerRight: () =>
        <TouchableOpacity style={{marginRight: 36 * ratio}} onPress={()=>{navigation.navigate("TOLogin")}}>
            <MaterialCommunityIcons name={'plus'} size={85 * ratio} color={'white'} />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: DeepBlue.bg_primary
    },
    textview: {
        marginHorizontal: 97 * ratio,
        marginVertical: 36 * ratio
    },
    infotext: {
        textAlign: 'center',
        color: DeepBlue.primary_light,
        fontFamily: 'prototype',
        fontSize: 39 * ratio
    },
    nametext: {
        color: DeepBlue.text_primary,
        fontFamily: 'prototype',
        fontSize: 36 * ratio
    },
    accountrow: {
        marginTop: 25 * ratio,
        padding: 25 * ratio,
        marginHorizontal: 29 * ratio,
        borderRadius: 47 * ratio,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DeepBlue.bg_secondary
    },
    rowtextview: {
        flex: 5
    },
    rowkeyview: {
        alignItems: 'center',
        flex: 2
    },
    rowdeleteview: {
        alignItems: 'center',
        flex: 1
    },
    touchablekeybutton: {
        flexDirection: 'row', 
        borderRadius: 47 * ratio,
        paddingVertical: 12 * ratio,
        paddingHorizontal: 29 * ratio,
        backgroundColor: DeepBlue.primary
    },
    listsection: {
        paddingBottom: 25 * ratio,
        maxHeight: 1000 * ratio,
        justifyContent: 'space-between',
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderRadius: 47 * ratio,
        borderColor: DeepBlue.primary
    }
});

export default TOAccountScreen;