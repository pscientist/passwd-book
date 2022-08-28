
import React, { useContext, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Badge, Avatar, ListItem } from "react-native-elements";
import Icon from "../components/Icon";
import colors from '../config/colors';
import { app } from '../my_firebase'
import { getAuth } from "firebase/auth";
import AuthContext from "../auth/context";
import Screen from '../components/Screen';
import { TouchableHighlight } from "react-native-gesture-handler";
import AuthStorage from '../auth/storage';

function AccountScreen({ navigation }) {
    const auth = getAuth(app);
    const authContext = useContext(AuthContext);

    // User Menu options
    const menuItems = [
        {
            key: 1,
            title: "Account: " + authContext.user?.email,
            icon: {
                name: "key",
                backgroundColor: colors.primary,
            },
            targetScreen: "Profile",
        },
        {
            key: 2,
            title: "Profile",
            icon: {
                name: "user",
                backgroundColor: colors.primary,
            },
            targetScreen: "Profile",
        },
        {
            key: 3,
            title: "Change Password",
            icon: {
                name: "book",
                backgroundColor: colors.primary,
            },
            targetScreen: "ChangePwd",
        },
        {
            key: 4,
            title: "Log Out",
            icon: {
                name: "logout",
                backgroundColor: colors.primary,
            },
            targetScreen: "",
        },

    ];

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                authContext.setUser('');// set app-wide user
                AuthStorage.removeToken(AuthStorage.authToken);
                console.log('Logged out.');
            })
            .catch(error => alert(error.message))
    }

    const Item = ({ title, icon, targetScreen }) => (
        <TouchableHighlight
            onPress={() => {
                if (targetScreen != "") {
                    navigation.navigate(targetScreen)
                } else {
                    if (title == "Log Out") {
                        handleSignOut();
                    }
                }
            }}
            style={styles.itemContainer}>
            <>
                <Icon
                    name={icon.name}
                    backgroundColor={icon.backgroundColor}
                />
                <View><Text style={styles.itemText}>{title}</Text></View>
            </>
        </TouchableHighlight>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} key={item.key} icon={item.icon} targetScreen={item.targetScreen} />
    );

    return (
        <Screen>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={menuItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    itemText: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 17
    },
    itemContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        color: 'white'
    },
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
    },
    wrapper: {
        margin: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#6495ED',
        marginBottom: 8,
        borderRadius: 10,
    },
    header: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 15,
        marginTop: 15,
        color: 'white'
    },
    headerNav: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,

    },
    button: {
        // backgroundColor: 'white',
        // width: '60%',
        // padding: 15,
        // borderRadius: 10,
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        paddingLeft: 5,
        // fontWeight: '700'
        // marginTop: 40,
    },
    logoutText: {
        // color: 'white',
        // fontWeight: '700',
        // fontSize: 16,
        fontStyle: 'italic'
    },
    loginText: {
        fontStyle: 'italic',
        fontSize: 16,

    },

    titleContainer: {
        marginBottom: 10,
        flexDirection: "row",
    },
    title: {
        fontSize: 17,
        marginLeft: 4,
        color: "#6e6969",
        fontWeight: "bold"
    },
    usernameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        marginRight: 10,
    },
    username: {
        marginLeft: 4,
        color: "#6e6969",
    },
})

export default AccountScreen;
