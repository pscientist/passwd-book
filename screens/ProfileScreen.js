
import { View, StyleSheet, FlatList, Text } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import app from '../my_firebase';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { ListItem } from "../components/lists";
import AuthContext from "../auth/context";

export default function ProfileScreen() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const authContext = useContext(AuthContext);

    useEffect(() => {
        setLoggedInUser(authContext.user);
    }, []);


    const userData =
        [{ title: loggedInUser.user, key: 1 },
        { title: loggedInUser.email, key: 2 },
            // { title: loggedInUser.password, key: 3 }
        ];

    const UserItem = ({ item }) => {
        return (<View style={styles.itemContainer}>
            <Text style={styles.itemText}> {item.title}
            </Text></View>);
    }

    const renderItem = ({ item }) => {
        return (<UserItem item={item}></UserItem>);
    }

    return (<Screen>
        <View style={{ flex: 1 }}>
            <FlatList
                data={userData}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
        </View>
    </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
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
});