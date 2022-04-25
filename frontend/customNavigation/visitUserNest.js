import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Search from '../screens/search';
import UserPage from '../screens/userPage';
import List from '../components/searchList';

const Stack = createStackNavigator();

export default function VisitUserNest() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search for people" component={Search}/>
            <Stack.Screen name="Account page for this user" component={UserPage}/>
        </Stack.Navigator>    
    )
}