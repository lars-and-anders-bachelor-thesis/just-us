import React, {useState} from 'react';
import { AuthContext } from '../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
 } from 'react-native';

export default function UserLogin() {
    const {signIn} = React.useContext(AuthContext);

    const [username, setUsername] = useState('');

    async function Submit() {
        await AsyncStorage.setItem('storageUsername', username["username"])
        signIn();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log into your user</Text>

            <TextInput style={styles.textinput} placeholder="Your username" 
             onChangeText={(text)=> setUsername({username: text})}
             underlineColorAndroid={'transparent'} ></TextInput>

            <TouchableOpacity style={styles.button} onPress={ () => Submit()}>
                <Text style={styles.btntxt}>Log in</Text>
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
        padding: 50,
      },
      header: {
          fontSize: 24, 
          color: '#000000',
          paddingBottom: 10,
          marginBottom: 40,
          borderBottomColor: '#00BFFF',
          borderBottomWidth: 1,
      },
      textinput: {
          alignSelf: 'stretch',
          height: 40,
          marginBottom: 30, 
        //   color: '#fff',
          borderBottomColor: '#00BFFF',
          borderBottomWidth: 1,
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