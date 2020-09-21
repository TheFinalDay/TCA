import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeepBlue } from '../../constants/Colors';

const dims = Dimensions.get('window');
const ratio = dims.width / 1000;

const TOAccountScreen = props => {

    const userDatas = useSelector(state => state.userdata.userDatas);

    const UserAccountItem = props => {
        
        return(
            <Text color={DeepBlue.bg_secondary}>placeholder</Text>
        );
    }

    useEffect(() => {
        console.log("userdata store loaded");
        // do stuff here??
    }, [userDatas])
        
    


    return(
        <View style={styles.screen}>
            <Text style={{color: DeepBlue.primary_light}}>TO Accounts Screen</Text>
            <Text style={{color: DeepBlue.primary_light}}>Coming soon!</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("TOLogin");
            }}>
                <Text style={{color: DeepBlue.primary_light}}>[navigate to TOLoginScreen]</Text>
            </TouchableOpacity>
            {userDatas.length > 0 && <FlatList
                data={userDatas}
                keyExtractor={ud => ud.apikey}
                renderItem={itemData => 
                    <View style={{marginTop: 10}}>
                        <Text style={{color: DeepBlue.primary_light}}>{itemData.item.name}</Text>
                        <Text style={{color: DeepBlue.primary_light}}>{itemData.item.apikey}</Text> 
                    </View>
                }
            />}
        </View>
        
    );

}

TOAccountScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Challonge Accounts',
        headerLeft: () =>
            <TouchableOpacity style={{marginLeft: 36 * ratio}} onPress={()=>{navigation.toggleDrawer()}}>
                <MaterialCommunityIcons name={'forwardburger'} size={85 * ratio} color={'white'} />
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: DeepBlue.bg_primary
    }
});

export default TOAccountScreen;