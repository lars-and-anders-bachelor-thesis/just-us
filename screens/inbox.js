import React from 'react';

import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
 } from 'react-native';

export default function Inbox({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Her var det massevis av kok!</Text>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate("Chat")}>
                <Text style={styles.btntxt}>Chat with cheeto</Text>
            </TouchableOpacity>
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
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
    }
})