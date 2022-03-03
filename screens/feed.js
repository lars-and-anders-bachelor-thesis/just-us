import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
 } from 'react-native';

export default function Feed({ navigation }) {
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={ () => navigation.navigate("Search for people")}  style={styles.search_icon}>
            <Icon name="search" size={30} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => navigation.navigate("Create a post")}  style={styles.plus_icon}>
            <Icon name="plus" size={40} color="black"/>
        </TouchableOpacity>
        <Text>Here's yo god damn feed bitch</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      search_icon: {
          position: 'absolute',
          top: 10,
          left: 10
      },
      plus_icon: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})