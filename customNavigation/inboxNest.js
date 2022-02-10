import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Inbox from '../screens/inbox';
import Chat from '../screens/chat';

const Stack = createStackNavigator();

export default function InboxNest() {
    return (
        <Stack.Navigator>
            {/* Her er det et mellomrom etter inbox fordi det blir warning når tab.screenen og stack.screenen heter det samme*/}
            <Stack.Screen name="Inbox " component={Inbox} /> 
            <Stack.Screen name="Chat" component={Chat}/>
        </Stack.Navigator>    
    )
}