import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'react-native-axios';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList,
 } from 'react-native';
import { registerRootComponent } from 'expo';

 const DATA = [
     {
         user_name: 'Lars Andreas Jåten',
         user_image: '../assets/profile_pictures/user-1.jpg',
         feed_image: 'https://www.datocms-assets.com/55942/1633528751-topptur.jpg?q=70&auto=format&w=450&fit=crop&crop=faces,focalpoint&iptc=allow&fp-x=0.5&fp-y=0.5',
         like_count: '13037',
         comment_count: '70'
     },
     {
         user_name: 'Andreas Ringnes',
         user_image: '../assets/profile_pictures/user-2.jpg',
         feed_image: 'https://www.datocms-assets.com/55942/1633528751-topptur.jpg?q=70&auto=format&w=450&fit=crop&crop=faces,focalpoint&iptc=allow&fp-x=0.5&fp-y=0.5',
         like_count: '13537',
         comment_count: '44'
     },
     {
         user_name: 'Willem Barents',
         user_image:  '../assets/profile_pictures/user-3.jpg',
         feed_image: 'https://www.datocms-assets.com/55942/1633528751-topptur.jpg?q=70&auto=format&w=450&fit=crop&crop=faces,focalpoint&iptc=allow&fp-x=0.5&fp-y=0.5',
         like_count: '13337',
         comment_count: '31'
     },
     {
         user_name: 'Leif Eriksson',
         user_image: '../assets/profile_pictures/user-4.jpg',
         feed_image: 'https://www.datocms-assets.com/55942/1633528751-topptur.jpg?q=70&auto=format&w=450&fit=crop&crop=faces,focalpoint&iptc=allow&fp-x=0.5&fp-y=0.5',
         like_count: '13137',
         comment_count: '52'
     },
 ]



 function Item({ item }){
    return (
        <View style={styles.card}>
            <View style={styles.card_Header}>
                <View style={styles.header_Left}>
                    <Image 
                    style={styles.userImage}
                    source={{
                        uri: DATA[3].feed_image,
                    }}/>
                    <Text style={styles.userName}>{item.id}</Text>
                </View>
                <View style={styles.header_Right}>
                    <Icon name="ellipsis-h" style={styles.kake}/>
                </View>
            </View>
            {/* <Image 
                    style={styles.feedImage}
                    source={{
                        uri: DATA[3].feed_image,
            }}/> */}
            <Text>{item.Data}</Text>
            <View style={styles.card_Footer}>
                <View style={styles.footer_Left}>
                    <View style={styles.footer_Left}>
                        <Icon name="heart" color="red" size={20}/>
                        <Text style={{ marginLeft: 5, fontSize: 16}}>{DATA[3].comment_count}</Text>
                    </View>
                <View style={{flexDirection: "row", marginLeft: 15}}></View>
                    <Icon name="comment" color="gray" size={20}/>
                    <Text style={{ marginLeft: 5, fontSize: 16}}>{DATA[3].like_count}</Text>
                </View>
                <Icon name="bookmark" color="gray" size={20}/>
            </View>

        </View>
    )
 };


 export default function Feed({ navigation }) {

    const FakeItem = ({ item }) => {
        return (
            <Text>Title of the coffee is {item.title}</Text>
        )
    };
   
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        let resp;
        const resp0nse = await axios.get('http://152.94.171.1:8080/Posts')
        .then(function (response) {
            // handle success
            resp = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        const data = resp;
        console.log(data)
        setData(data);
        setLoading(false);
    };   

     useEffect(() => {
        fetchData();
      }, []);

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={ () => navigation.navigate("Search for people")}  style={styles.search_icon}>
            <Icon name="search" size={30} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => navigation.navigate("Create a post")}  style={styles.plus_icon}>
            <Icon name="plus" size={40} color="black"/>
        </TouchableOpacity>

        <FlatList
            data={data} // DATA
            // renderItem={({ item }) => <Item user_name={item.user_name}
            // user_image={item.user_image}
            // feed_image={item.feed_image}
            // like_count={item.like_count}
            // comment_count={item.comment_count}
            // />}
            renderItem={Item}
            keyExtractor={(item) => item.id} //.ToString()
        />
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
    },
    feedImage: {
        height: 300,
        borderRadius: 10,
        marginVertical: 10,
    },
    card_Footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    footer_Left: {
        flexDirection: 'row',
    },
})  
   
// import React, { useState, useEffect } from "react";
// import { Box, FlatList, Center, View, NativeBaseProvider, Text } from "react-native";

// export default function Feed({ navigation }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     const resp = await fetch("https://api.sampleapis.com/coffee/hot");
//     const data = await resp.json();
//     setData(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderItem = ({ item }) => {
//     return (
//     //   <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
//     //     {item.title}
//     //   </Box>
//         <Text>{item.title} is the title. {item.description} is the description</Text>
//     );
//   };

//   return (
//     <View>
//           <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//           />
//           {/* <Text>{data.map(oink => oink.id)} is the best ever!</Text> */}
//     </View>
//   );
// }