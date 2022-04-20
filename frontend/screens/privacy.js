import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
 } from 'react-native';

export default function Privacy({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate("Tree")}>
                <Text style={styles.btntxt}>Check out the forwarding tree for this post</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50, // this is not best pratice
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:20,
        backgroundColor: '#00BFFF',
        marginTop: 30,
        borderRadius: 10,
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
    }
})