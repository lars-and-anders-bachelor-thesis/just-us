import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
 } from 'react-native';

export default function Search({navigation}) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();
    const [found, setFound] = useState(false);

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
            await fetch('http://192.168.218.169:8080/Users/Search', {
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
            console.log("This did not go as planned")
        }
    };

    async function Follow()
    {   
      const user = await AsyncStorage.getItem('storageUsername');
      let resp;  
        try{
            await fetch('http://192.168.218.169:8080/User/Follow', {
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
            alert("You have now sent a follower request from "+user+" to: "+searchPhrase)
        }catch{
            console.log("This did not go as planned")
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
       <Text style={styles.details}>Found a user with the username: {searchPhrase}</Text>
       <TouchableOpacity style={styles.followUserBtn} onPress={() => Follow()}>
         <Text style={styles.loginText}>Send this user a follow request</Text>
       </TouchableOpacity>
       </View>
      }
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
      justifyContent: "center",
      marginTop: 10,
      backgroundColor: "#157EFB",
  },
})