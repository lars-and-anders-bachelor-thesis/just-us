import React from 'react';
import {
    Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/messagesStyles';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList
 } from 'react-native';


 const Messages = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/profile_pictures/user-1.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/profile_pictures/user-2.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/profile_pictures/user-3.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/profile_pictures/user-4.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/profile_pictures/user-7.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];
  


export default function Inbox({ navigation }) {
    return (
        <Container>
            <FlatList
            data={Messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <Card onPress={() => navigation.navigate("Chat", {userName: item.userName})}>
                    <UserInfo>
                        <UserImgWrapper>
                            <UserImg source={item.userImg}/>
                        </UserImgWrapper>
                        <TextSection>
                            <UserInfoText>
                                <UserName>{item.userName}</UserName>
                                <PostTime>{item.postTime}</PostTime>
                            </UserInfoText>
                            <MessageText>{item.messageText}</MessageText>
                        </TextSection>
                    </UserInfo>
                </Card>
            )}
            >
            </FlatList>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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