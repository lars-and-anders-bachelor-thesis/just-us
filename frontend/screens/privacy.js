import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import '../assets/globalVariable.js'

import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    StyleSheet,
    Text,
    View,
    FlatList,
 } from 'react-native';

export default function Privacy({ navigation }) {

    const [postIdList, setPostIdList] = useState([]);
    const [userSharedList, setUserSharedList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

    async function makeShareList(posts){ 
        const postIdList = [];
        {posts.map((post)=>{
            postIdList.push(post["postId"])
        })}
        let resp2;  
        let IPaddress = global.ip
        let userSharedListy = [];
        const user = await AsyncStorage.getItem('storageUsername')
        {postIdList.map((postId)=>{
            // getHistory(postId)
            const resp0nse = axios.get('http://'+IPaddress+':8080/History/'+user+'/'+postId) // /User
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
        let IPaddress = global.ip
        let resp;  
        const user = await AsyncStorage.getItem('storageUsername')
        const resp0nse = await axios.get('http://'+IPaddress+':8080/Profile?username='+user) // /User
        .then(function (response) {
            // handle success
            resp = response.data;
            console.log("\nDette er da data'n kompis: "+JSON.stringify(resp["posts"]))
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        makeShareList(resp["posts"])
        followers.push(resp["followers"])
        setFollowerList(followers[0])
      };   
      
      useEffect(() => {
        fetchData();
      }, []);


    return (
            <View>
                <Text style={styles.info}>
                    Here is the the users who have shared your posts. The red sharers does not follow you. {global.ip}
                </Text>
            <FlatList
            data={userSharedList}
            keyExtractor={item => item.postId}
            renderItem={({item}) => ( // This is where the rendered component is defined.
                <View style={styles.container}>
                    <View style={styles.postIdField} numberOfLines={1}>
                        <Text>Postid: {item.postId.substring(0,7)}</Text> 
                    </View>
                    {item.sharers.length > 0 &&    // The content after && is displayed if the condition is true.
                        <View style={styles.userCard}>
                            {item.sharers.map((username) => { // Map is looping through the sharers list and retrieves the username
                                return(
                                    <View style={styles.arrowUser}>
                                        <Icon name="arrow-right" size={20} style={styles.arrow}/>
                                        {!followerList.includes(username) ? // A new if-statement with a condition.
                                        //  This is where users that are in the share list and not in the followerlist
                                        //  gets red font and the follower gets normal black font.
                                        <View>                              
                                            <Text style={styles.imposter}>{username}</Text>
                                        </View>
                                        : // This is the else-statement. Because of this, the ?-operator is used instead of &&.
                                        <View>
                                            <Text>{username}</Text> 
                                        </View>}
                                    </View>
                                )
                            })}
                        </View>
                    }
                    {item.sharers.length < 1 && // Another conditional rendering that check if the post has any sharers.
                    <View style={styles.arrowUser}>
                        <Text>No one has shared this post.</Text>
                    </View>}
                </View>
            )}></FlatList>
        </View>
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
    info: {
        padding: 30,
    },
})