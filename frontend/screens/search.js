import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import List from '../components/searchList'; 
import UserPage from './userPage';
import { useNavigation } from '@react-navigation/native';

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

    return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}></Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
            navigation={navigation}
          />
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
})