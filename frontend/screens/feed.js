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
        <View style={styles.card}>
            <View style={styles.card_Header}>
                <View style={styles.header_Left}>
                    <Image 
                    style={styles.userImage}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}/>
                    <Text style={styles.userName}>Lars-Andreas Jåten</Text>
                </View>
                <View style={styles.header_Right}>
                    <Icon name="ellipsis-h" style={styles.kake}/>

                </View>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ddd",
    },
    search_icon: {
          position: 'absolute',
          top: 10,
          left: 10
    },
    plus_icon: {
        position: 'relative',
        top: 10,
        right: -350
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    card_Header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header_Left: {
        flexDirection: 'row',
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 15,
    },
    kake: {
        fontSize: 20,
    }
})  