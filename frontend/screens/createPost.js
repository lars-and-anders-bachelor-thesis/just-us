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

export default function CreatePost() {

    const [data, setData] = useState('');

    async function Submit()
    {   
        const user = await AsyncStorage.getItem('storageUsername')
        try{
            fetch('http://192.168.218.169:8080/Post', {
                method: 'POST',
                body: JSON.stringify({data: data["data"], owner: user})
            })
            alert("You have now successfully created a new post!");
        }catch{
            console.log("This did not go as planned")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create post</Text>

            <TextInput style={styles.textinput} placeholder="Content of the post"
             onChangeText={(text)=> setData({data: text})}
             underlineColorAndroid={'transparent'} ></TextInput>
           
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>{Submit()}}>
                <Text style={styles.btntxt}>Post</Text>
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
          color: 'black',
          borderBottomColor: '#f8f8f8',
          borderBottomWidth: 1,
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
      btntxt: {
          color: '#fff',
          fontWeight: 'bold',
      }
})