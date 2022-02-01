import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Login from '../screens/login';
import Feed from '../screens/feed';
import Profile from '../screens/profile';
import Inbox from '../screens/inbox';

const bottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'login'; // ??

export default function BottomTabNavigator({ navigation, route}) {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <bottomTab.Navigator initialRouteName = {INITIAL_ROUTE_NAME}>
            <bottomTab.Screen
                name="login"
                component={Login}
                options={{
                    title: 'Pelle og bLEKE'
                    // tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="mode-code-working" />
                }}
            />
        </bottomTab.Navigator>
    )
}