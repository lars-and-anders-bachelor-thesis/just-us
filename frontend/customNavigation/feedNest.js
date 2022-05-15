import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Feed from '../screens/feed';
import CreatePost from '../screens/createPost';
import VisitUserNest from './visitUserNest';
const Stack = createStackNavigator();

export default function FeedNest() {
    return ( // This the nest for the Home screen
             // that enable navigation between these screen
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={Feed}/>
            <Stack.Screen name="Search for people" component={VisitUserNest}
                          options={{headerShown: false}}/>
            <Stack.Screen name="Create a post" component={CreatePost}/>
        </Stack.Navigator>    
    )
}