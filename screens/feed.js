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
        <TouchableOpacity onPress={ () => navigation.navigate("Search")}>
            <Icon name="search" size={30} color="black" />
        </TouchableOpacity>
        <Text>Search</Text>
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
})