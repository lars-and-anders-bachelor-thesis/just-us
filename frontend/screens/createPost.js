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

export default function CreatePost() {

    const [owner, setOwner] = useState('');
    const [data, setData] = useState('');

    function Submit()
    {   
        alert("The owner is "+owner["owner"]+" and the content is "+data["data"])

        try{
            fetch('http://152.94.171.1:8080/Post', {
                method: 'POST',
                body: JSON.stringify({data: data["data"], owner: owner["owner"]})
            });
        }catch{
            console.log("ay dette funka visst ikke kompis")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create post</Text>

            <TextInput style={styles.textinput} placeholder="Owner of the post" 
             underlineColorAndroid={'transparent'}
             onChangeText={(text)=> setOwner({owner: text})}
             ></TextInput>

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
          color: '#fff',
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