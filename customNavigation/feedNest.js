import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Feed from '../screens/feed';
import Search from '../screens/search';
import CreatePost from '../screens/createPost';

const Stack = createStackNavigator();

export default function FeedNest() {
    return (
        <Stack.Navigator>
            {/* options={{headerShown: false}} inn på feed, men da må iconen flyttes ned */}
            <Stack.Screen name="Feed" component={Feed}/>
            <Stack.Screen name="Search for people" component={Search}/>
            <Stack.Screen name="Create a post" component={CreatePost}/>
        </Stack.Navigator>    
    )
}