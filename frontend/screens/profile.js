import React, { Component, useState, useEffect } from 'react';
import { AuthContext } from '../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import '../assets/globalVariable.js'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';


export default function Profile() {
  
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  
  function Item({ item }){
    return (
        <View style={styles.card}>
          <View style={styles.namebox}>
            <Text>{item}</Text>
            <View style={styles.icons}>
              <Icon name="ban" color="red" size={20} />
              <TouchableOpacity onPress={() => AcceptFollower(item)}>
                <Icon name="check" color="green" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  };

function showPending() {
  if (clicked) {
    setClicked(false)
  }else{
    setClicked(true)
  }
}

const fetchData = async () => {
  let IPaddress = global.ip;
  let resp;  
  const user = await AsyncStorage.getItem('storageUsername')
  setUser(user)
  const resp0nse = await axios.get('http://'+IPaddress+':8080/Profile?username='+user) // /User
  .then(function (response) {
      // handle success
      resp = response.data;
      console.log("Dette er da data'n kompis: "+JSON.stringify(resp))
  })
  .catch(function (error) {
      // handle error
      console.log(error);
  })
  .then(function () {
      // always executed
  });
  setData(resp["pendingFollowers"]);
};   

useEffect(() => {
  fetchData();
}, []);

async function AcceptFollower(item){
  let IPaddress = global.ip;
  const user = await AsyncStorage.getItem('storageUsername')
  try{
    await fetch('http://'+IPaddress+':8080/User/AcceptFollow', {
        method: 'POST',
        body: JSON.stringify({userId: user, queryId: item})
    });
    alert("You have now accepted the follower request of "+item);
  }catch{
    console.log("This did not go as planned")
  }
  await fetchData();
}

async function LogOut(){
  setUser("")
  signOut();
}


const { signOut } = React.useContext(AuthContext);
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.texty}>{user}</Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => showPending()}>
                <Text style={styles.texty}>Show pending followers</Text>  
              </TouchableOpacity>           
              {clicked &&
              <FlatList
                data={data} 
                renderItem={Item}
                keyExtractor={(item) => item.id} //.ToString()
              />
              }
              <TouchableOpacity style={styles.buttonContainer} onPress={() => LogOut()}>
                <Text style={styles.texty}>Log out</Text> 
              </TouchableOpacity>
            </View>
        </View>
          </View>
    );
  }

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    // flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
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
  logout_btn: {
      position: 'absolute',
      bottom: 0,
  }, 
  namebox: {
    width: 250,
    height: 50,
    borderRadius:30,
    borderWidth: 1,
    paddingTop: 13,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    alignContent: 'space-between',
  },
  icons: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 10,
    width: 80,
    alignItems: 'stretch'
  },
  texty: {
    fontWeight: 'bold',
    fontSize: 17,
  }
});