import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

// test bracket url: https://challonge.com/picfs9jq

const ImportTourneyScreen = props => {

    // TODO - IN ORDER:
    // - get tourney URL from user
    // - get players list from API
    // - get user associated contestant with dropdown list
    // - switch to dashboard and do all the GET requests for the bracket there...

    /**
    
    public async sendRequest(keyword: string): Promise<Array<Object>>{
        
        var formatted_keyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var myHeaders = new Headers();
		var requestOptions: RequestInit = { method: 'GET', headers: myHeaders, redirect: 'follow' };
		try {
			let response = await fetch(`https://prod-19.canadacentral.logic.azure.com/workflows/
					7810e8b05a0c4da197f91c5088f74e05/triggers/manual/paths/invoke/nomEntreprise/${formatted_keyword}?
					api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&
					sig=oJ-WjSJRhEpRbUnolxruhPj6PL2bgeYZ_LXCV1oG0Ys`, requestOptions)
			if (response.status !== 200) { 
                console.log(`${response.status} ${response.statusText} | ${response.url}`); 
                let responsetext = await response.text();
                if(responsetext == "Erreur : Plus de 500 résultats précisez votre recherche svp."){
                    this.updateIsDataOverloadHandler(true);
                }
                return []; 
            }
            let responsetext = await response.text();
            let items = JSON.parse(responsetext).value;
			return items;
		} catch (e) { throw e; }
    }

     */

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