import React, {useState} from 'react';
import '../assets/globalVariable.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
 } from 'react-native';

export default function CreatePost() {

    const [data, setData] = useState(''); // The local variable where the post is temporarily stored

    async function Submit() // The Submit function is async so await can be used
    {   
        let IPaddress = global.ip;
        const user = await AsyncStorage.getItem('storageUsername') // Get the user that is logged in
        try{
            fetch('http://'+IPaddress+':8080/Post', {             // The fetch with method POST
                method: 'POST',
                body: JSON.stringify({data: data["data"], owner: user}) // Body including the post and the posting user
            })
            alert("You have now successfully created a new post!");
        }catch{
            console.log("This did not go as planned")           // This message logs when the fetch is unsuccessful 
        }
    };
    
    // This is the component that is visually displayed on the screen
    return ( 
        <View style={styles.container}> 
            <Text style={styles.header}>Create post</Text>

            <TextInput style={styles.textinput} placeholder="Content of the post"
             onChangeText={(text)=> setData({data: text})}  // The data variable set by the essential OnChangeText property
             underlineColorAndroid={'transparent'} ></TextInput> 
           
            <TouchableOpacity style={styles.buttonContainer} 
                onPress={()=>{Submit()}}                // TouchableOpacity is the button that calls Submit() when pressed
                ><Text style={styles.btntxt}>Post</Text>
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