import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
    FlatList,
 } from 'react-native';

const fakeUsernames = [
    {
        id: '1',
        sharer: 'Peter',
        receuiver: 'Lars',
    },
    {
        id: '2',
        first: 'Lars',
        second: 'Peter',
        fourth: 'Erlend',
        third: 'Amish',
        fifth: 'Knut'
    },
    {
        id: '3',
        first: 'Peter',
    },
    {
        id: '4',
        first: 'Chris',
        second: 'Amish',
        third: 'Peter',
    },
];

export default function Privacy({ navigation }) {

    const [postIdList, setPostIdList] = useState([]);
    const [userSharedList, setUserSharedList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

    async function makePostIdList(posts){ 
        const postIdList = [];
        {posts.map((post)=>{
            postIdList.push(post["postId"])
        })}
        let resp2;  
        let userSharedListy = [];
        const user = await AsyncStorage.getItem('storageUsername')
        {postIdList.map((postId)=>{
            // getHistory(postId)
            const resp0nse = axios.get('http://152.94.171.1:8080/History/'+user+'/'+postId) // /User
            .then(function (response) {
                // handle success
                resp2 = response.data;
                userSharedListy.push({
                    sharers: resp2[0],
                    postId: postId
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        })}
        let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        setUserSharedList(userSharedListy)
    };

    const fetchData = async () => {
        let followers = [];
        let resp;  
        const user = await AsyncStorage.getItem('storageUsername')
        const resp0nse = await axios.get('http://152.94.171.1:8080/Profile?username='+user) // /User
        .then(function (response) {
            // handle success
            resp = response.data;
            // console.log("\nDette er da data'n kompis: "+JSON.stringify(resp["posts"]))
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        makePostIdList(resp["posts"])
        followers.push(resp["followers"])
        setFollowerList(followers[0])
      };   
      
      useEffect(() => {
        fetchData();
      }, []);


    return (
            <FlatList
            data={userSharedList}
            keyExtractor={item => item.postId}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <View style={styles.postIdField} numberOfLines={1}>
                        <Text>Postid: {item.postId.substring(0,7)}</Text>
                    </View>
                    {item.sharers.length > 0 &&
                        <View style={styles.userCard}>
                            {item.sharers.map((username) => {
                                return(
                                    <View style={styles.arrowUser}>
                                        <Icon name="arrow-right" size={20} style={styles.arrow}/>
                                        {!followerList.includes(username) ? 
                                        <View><Text style={styles.imposter}>{username}</Text></View>
                                        :
                                        <View><Text>{username}</Text></View>}
                                    </View>
                                )
                            })}
                        </View>
                    }
                    {item.sharers.length < 1 &&
                    <View style={styles.arrowUser}>
                        <Text>No one has shared this post.</Text>
                    </View>
                    }
                </View>
            )}
            >
            </FlatList>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50, // this is not best pratice
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'space-between',
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
    },
    arrow: {
        color: 'black',
        paddingRight: 10,
    },
    arrowUser: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 30,

    },
    postIdField: {
        width: 60,
    },
    userCard: {
        flex: 1,
        flexDirection: 'column',
    },
    imposter: {
        color: 'red',
    },
})