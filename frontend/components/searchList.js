// List.js
import React from "react";
import VisitUserNest from "../customNavigation/visitUserNest";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details, navigation}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
    <TouchableOpacity style={styles.visitUserBtn} onPress={() => navigation.navigate("Account page for this user")}>
      <Text style={styles.loginText}>Visit this users page</Text>
    </TouchableOpacity>
  </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data, navigation }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    // HER TENKER JEG DU KAN SKRIVE EN FIN GET REQUEST FRA SEARCHPHRASEN
    if (searchPhrase === "") {
      return <Item name={item.name} details={item.details} navigation={navigation}/>;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} navigation={navigation}/>;
    }
    // filter of the description
    if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} navigation={navigation}/>;
    }
  };
  
  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  visitUserBtn: {
      width: "80%",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#157EFB",
  },
});