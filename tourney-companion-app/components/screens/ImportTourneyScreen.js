import React from 'react';
import { Text, StyleSheet, View, Button, Flatlist, TextInput} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as tourneyActions from '../../store/actions/tournaments';

// test bracket url: https://challonge.com/picfs9jq

const ImportTourneyScreen = props => {

    // TODO - IN ORDER:
    // - get tourney URL from user
    // - get players list from API
    // - get user associated contestant with dropdown list
    // - switch to dashboard and do all the GET requests for the bracket there...

    const dispatch = useDispatch();
    // use in onClick function as: 
    //// dispatch(tourneyActions.createTourney(the url entered by the user...))

    const [value, onChangeText] = React.useState('Enter URL here...');

    return(
        <View>
            <Text>Enter a Challonge URL:</Text>
            <View>
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                <Button title="Join Tourney"/>
            </View>
        </View>
    );
}

ImportTourneyScreen.navigationOptions = { }

const styles = StyleSheet.create({
    textinput: {
        height: 40, 
        borderColor: 'black',
        borderWidth: 1
    }
});

export default ImportTourneyScreen;