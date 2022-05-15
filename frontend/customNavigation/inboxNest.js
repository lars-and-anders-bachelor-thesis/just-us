import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Inbox from '../screens/inbox';
import Chat from '../screens/chat';

const Stack = createStackNavigator();

Stack.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "Chat") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }
  
    return {
      tabBarVisible
    };
  };

export default function InboxNest() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Inbox " component={Inbox} /> 
            <Stack.Screen name="Chat" component={Chat} options={({route}) => ({
                title: route.params.userName //  options is the reason we get Username as the screen title
            })}/> 
        </Stack.Navigator>    
    )
}