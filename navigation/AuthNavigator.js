
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPwdScreen from "../screens/ForgotPwdScreen";
import defaultStyles from '../config/defaultStyles';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                    title: "Welcome",
                    headerStyle: defaultStyles.defaultHeaderStyle,
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    title: "",
                    headerStyle: defaultStyles.defaultHeaderStyle,
                    // headerShown: false,
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: "Register",
                    headerStyle: defaultStyles.defaultHeaderStyle,
                }}
            />

            <Stack.Screen
                name="ForgotPwdScreen"
                component={ForgotPwdScreen}
                options={{
                    title: "Forgot My Password",
                    headerStyle: defaultStyles.defaultHeaderStyle,
                }}
            />
        </Stack.Navigator>
    );
};

// const styles = StyleSheet.create({
//     defaultHeaderStyle: {
//         backgroundColor: "#666"
//     }
// });

export default AuthNavigator;
