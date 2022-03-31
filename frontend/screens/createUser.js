import React from 'react';
import { AuthContext } from '../context/context';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
 } from 'react-native';

export default function CreateUser() {
    const {signIn} = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register User</Text>

            <TextInput style={styles.textinput} placeholder="Your name" 
             underlineColorAndroid={'transparent'} ></TextInput>

            <TextInput style={styles.textinput} placeholder="Your email"
             underlineColorAndroid={'transparent'} ></TextInput>

            <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Your Password here"
             underlineColorAndroid={'transparent'}></TextInput>
           
            <TouchableOpacity style={styles.button} onPress={ () => signIn()}>
                <Text style={styles.btntxt}>Sign up here bitch</Text>
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
      header: {
          fontSize: 24, 
          color: '#000000',
          paddingBottom: 10,
          marginBottom: 40,
          borderBottomColor: '#199187',
          borderBottomWidth: 1,
      },
      textinput: {
          alignSelf: 'stretch',
          height: 40,
          marginBottom: 30, 
          color: '#fff',
          borderBottomColor: '#f8f8f8',
          borderBottomWidth: 1,
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