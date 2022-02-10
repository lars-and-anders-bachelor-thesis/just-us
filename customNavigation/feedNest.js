import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Feed from '../screens/feed';
import Search from '../screens/search';

const Stack = createStackNavigator();

export default function FeedNest() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="Search" component={Search}/>
        </Stack.Navigator>    
    )
}