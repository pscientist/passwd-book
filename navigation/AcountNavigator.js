import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePwdScreen from "../screens/ChangePwdScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerShown: true
    }}>
        <Stack.Screen
            name="Account"
            component={AccountScreen}
            options={{
                title: "",
                headerStyle: defaultStyles.defaultHeaderStyle,
            }}
        />
        <Stack.Screen
            name="ChangePwd"
            component={ChangePwdScreen}
            options={{
                title: "Change Password",
                headerStyle: defaultStyles.defaultHeaderStyle,
            }}
        />
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                title: "Profile",
                headerStyle: defaultStyles.defaultHeaderStyle,
            }}
        />
        <Stack.Screen
            name="ChangePwdScreen"
            component={ChangePwdScreen}
            options={{
                title: "Change Password",
                headerStyle: defaultStyles.defaultHeaderStyle,
            }}
        />
    </Stack.Navigator>
);

export default AccountNavigator;
