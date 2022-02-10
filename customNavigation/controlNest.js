import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Privacy from '../screens/privacy';
import Tree from '../screens/tree';

const Stack = createStackNavigator();

export default function ControlNest() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Privacy " component={Privacy} />
            <Stack.Screen name="Tree" component={Tree}/>
        </Stack.Navigator>    
    )
}