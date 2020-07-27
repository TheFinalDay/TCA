import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
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

    return(
        <View>
            <Text>Import Tourney Screen</Text>
        </View>
    );
}

ImportTourneyScreen.navigationOptions = {
    headerTitle: "New Tourney"
}

const styles = StyleSheet.create({

});

export default ImportTourneyScreen;