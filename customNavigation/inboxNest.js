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
            {/* Her er det et mellomrom etter inbox fordi det blir warning når tab.screenen og stack.screenen heter det samme*/}
            <Stack.Screen name="Inbox " component={Inbox} /> 
            <Stack.Screen name="Chat" component={Chat} options={({route}) => ({
                title: route.params.userName
            })}/> 
            {/* options her gjør at vi kan ha username som tittel */}
        </Stack.Navigator>    
    )
}