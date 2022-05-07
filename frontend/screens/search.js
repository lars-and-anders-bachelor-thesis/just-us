import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import List from '../components/searchList'; 
import UserPage from './userPage';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

import { 
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
 } from 'react-native';

export default function Search({navigation}) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();
    const [found, setFound] = useState(false);

    // get data from the fake api endpoint
    useEffect(() => {
        const getData = async () => {
        const apiResponse = await fetch(
            "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
        );
        const data = await apiResponse.json();
        setFakeData(data);
        };
        getData();
    }, []);

    async function Search()
    {   
      const user = await AsyncStorage.getItem('storageUsername');
      let resp;  
        try{
            await fetch('http://152.94.171.1:8080/Users/Search', {
                method: 'POST',
                body: JSON.stringify({userId: user, queryId: searchPhrase})
            }).then(response => response.json())
              // handle success
            .then(json => resp=json)
              .catch(function (error) {
              // handle error
              console.log(error);
            })
              .then(function () {
              // always executed
            });
            if (resp) {
              setFound({found: true})
            } else {
              alert("Sorry didnt find any user with the name of: "+searchPhrase)
            }
        }catch{
            console.log("ay dette funka visst ikke kompis")
        }
    };

    async function Follow()
    {   
      const user = await AsyncStorage.getItem('storageUsername');
      let resp;  
        try{
            await fetch('http://152.94.171.1:8080/User/Follow', {
                method: 'POST',
                body: JSON.stringify({userId: user, queryId: searchPhrase})
            }).then(response => response.json())
              // handle success
            .then(json => resp=json)
              .catch(function (error) {
              // handle error
              console.log(error);
            })
              .then(function () {
              // always executed
            });
            alert("Nå sendte vi en follow-boi med user: "+user+" til brukeren: "+searchPhrase)
        }catch{
            console.log("ay dette funka visst ikke kompis")
        }
    };

    return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}></Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setFound={setFound}
        clicked={clicked}
        setClicked={setClicked}
      />
      <TouchableOpacity style={styles.searchBtn} onPress={() => Search()}>
        <Text style={styles.loginText}>Search user</Text>
      </TouchableOpacity>
      {found &&
      <View>
       <Text style={styles.details}>Found an user with the username: {searchPhrase}</Text>
       <TouchableOpacity style={styles.followUserBtn} onPress={() => Follow()}>
         <Text style={styles.loginText}>Send this user a follow request</Text>
       </TouchableOpacity>
       </View>
      }
      {/* <List
        searchPhrase={searchPhrase}
        data={fakeData}
        setClicked={setClicked}
        navigation={navigation}
      /> */}
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      width: "100%",
      marginTop: 20,
      fontSize: 25,
      fontWeight: "bold",
      marginLeft: "10%",
    },
    searchBtn: {
      width: "85%",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
      backgroundColor: "#157EFB",
    },
    followUserBtn: {
      width: "100%",
      borderRadius: 10,
      height: 50,
      padding: 10,
      // alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      backgroundColor: "#157EFB",
  },
})