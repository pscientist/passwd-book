import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PasswdsSummaryScreen from "../screens/PasswdsSummaryScreen";
import PasswdEditScreen from "../screens/PasswdEditScreen";
import defaultStyles from "../config/defaultStyles";

const Stack = createStackNavigator();

const PasswdsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PasswdsSummaryScreen"
                component={PasswdsSummaryScreen}
                options={{
                    title: "",
                    headerStyle: defaultStyles.defaultHeaderStyle,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PasswdEditScreen"
                component={PasswdEditScreen}
                options={{
                    title: "",
                    headerStyle: defaultStyles.defaultHeaderStyle,
                }}
            />
        </Stack.Navigator>
    )
}

export default PasswdsNavigator;
