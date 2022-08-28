
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import AccountNavigator from "./AcountNavigator";
import PasswdsNavigator from "./PasswdsNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: { position: 'absolute' },
            tabBarLabelStyle: { color: "#555", fontSize: 12, fontWeight: "600" }
        }}>
            <Tab.Screen
                name="PasswdsNavigator"
                component={PasswdsNavigator}
                options={{
                    title: "Passwords",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="clipboard-list" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="AccountNavigator"
                component={AccountNavigator}
                options={{
                    title: "My Account",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
