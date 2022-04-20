import React, {useState} from 'react';
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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function Submit()
    {   
        alert("Username: "+username["username"]+"\nPassword: "+password["password"]+"\nWelcome to Just Us <3");

        try{
            fetch('http://152.94.171.1:8080/User', {
                method: 'POST',
                body: JSON.stringify({username: username["username"], password: password["password"]})
            });
            // signIn();
        }catch{
            console.log("ay dette funka visst ikke kompis")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register User</Text>

            <TextInput style={styles.textinput} placeholder="Your username" 
             onChangeText={(text)=> setUsername({username: text})}
             underlineColorAndroid={'transparent'} ></TextInput>

            <TextInput style={styles.textinput} placeholder="Your password"
             password={true}
             secureTextEntry={true}
             onChangeText={(text)=> setPassword({password: text})}
             underlineColorAndroid={'transparent'} ></TextInput>

            <TouchableOpacity style={styles.button} onPress={ () => Submit()}>
                <Text style={styles.btntxt}>Sign up here and log in</Text>
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