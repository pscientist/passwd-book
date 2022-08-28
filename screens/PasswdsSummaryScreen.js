import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import app from '../my_firebase'
import { ListItemDeleteAction } from "../components/lists";
import { TouchableHighlight, Swipeable, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getFirestore, initializeFirestore, collection, query, where, doc, orderBy, onSnapshot, deleteDoc } from "firebase/firestore";
import colors from '../config/colors';
import AuthContext from "../auth/context";
import Screen from '../components/Screen';
import AlphabetList from "react-native-flatlist-alphabet";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const PasswdsSummaryScreen = ({ route }) => {

    const [passwds, setPasswds] = useState([]);
    const [filteredPasswds, setFilteredPasswds] = useState([]);
    const [error, setError] = useState(false);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const db = initializeFirestore(app, {
            experimentalForceLongPolling: true,
        });

        const q = query(collection(db, "passwds"),
            where('user', '==', authContext.user.user), orderBy('name'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const output = [];
            querySnapshot.forEach((doc) => {
                return (output.push({ id: doc.id, data: doc.data(), key: doc.data().name, value: doc.data().name, }));
            });

            setPasswds([]);
            setPasswds(output);
            setFilteredPasswds([]);
            setFilteredPasswds(output);
        });

        // clean up function to call when this component unmounts
        return () => { unsubscribe(); }

    }, []);

    const filterList = (searchText) => {
        if (searchText !== '') {
            const fpasswds = filteredPasswds.filter(item => item.data.name.includes(searchText));
            setFilteredPasswds(fpasswds);
        } else {
            setFilteredPasswds(passwds);
        }
    }

    const handleDelete = (passwdToDelete) => {
        const db = getFirestore(app);
        const docRef = doc(db, 'passwds', passwdToDelete.id);
        deleteDoc(docRef).catch(error => { setError(true); console.log(error.message) });
    };

    const navigation = useNavigation()

    return (
        <Screen style={styles.wrapper}>
            <View style={{ flexDirection: 'row' }}>
                <TextInput style={styles.searchBox}
                    placeholder="Search..."
                    onChangeText={(text) => { filterList(text); }}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('PasswdEditScreen') }} >
                    <Text style={styles.addSymbol}>+</Text>
                </TouchableOpacity>
            </View>

            <AlphabetList
                data={filteredPasswds}
                indexLetterColor="lightblue"
                renderSectionHeader={(section) =>
                    (<View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}
                        </Text>
                    </View>)}
                renderItem={(item) => (
                    <View style={styles.itemContainer}>
                        <Swipeable
                            renderRightActions={() => (
                                <ListItemDeleteAction onPress={() => handleDelete(item)} />
                            )} >
                            <TouchableWithoutFeedback style={styles.touchableContainer}
                                underlayColor="#eeeeee"
                                onPress={() => {
                                    navigation.navigate("PasswdEditScreen", { passwd: item })
                                }}>
                                <>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.title} numberOfLines={1}>
                                            {item.data.name}
                                        </Text>
                                        <Text style={styles.username} numberOfLines={1}>
                                            {item.data.username}
                                        </Text>
                                    </View>
                                    <View style={styles.usernameContainer}>
                                        <Text style={styles.hints}>
                                            {item.data.hints.length > 70 ? item.data.hints.substring(0, 70) + "..." : item.data.hints}
                                        </Text>
                                    </View>
                                </>
                            </TouchableWithoutFeedback>
                        </Swipeable>
                    </View>
                )}
            />
        </Screen >
    )
}

export default PasswdsSummaryScreen

const styles = StyleSheet.create({
    searchBox: {
        width: "85%",
        backgroundColor: 'white',
        padding: 7,
        borderRadius: 8
    },
    addButton: {
        backgroundColor: colors.primary,
        width: 40,
        marginLeft: 10,
        height: 40,
        alignItems: 'center',
        borderRadius: 20
    },
    addSymbol: {
        fontWeight: '700',
        fontSize: 30,
        color: 'white'
    },
    wrapper: {
        padding: 15,
    },
    categoryColor: {
        width: 17, height: 17, marginTop: 2, marginLeft: 7,
    },
    sectionText: {
        color: "white",
        fontWeight: "700"
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        fontStyle: 'italic'
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#888",
        paddingBottom: 10,
        paddingTop: 7,
        width: "90%"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        marginRight: 10,
        color: colors.light,
        fontWeight: "700"
    },
    categoryText: {
        fontStyle: 'italic',
        fontSize: 17,
    },
    usernameContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    // alphebet rounded background
    sectionHeader: {
        height: 30,
        backgroundColor: "#555",
        borderRadius: 15,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        fontFamily: 'Orbitron',
    },
    username: {
        marginRight: 7,
        color: colors.medium,
        fontWeight: "bold",
    },
    hints: {
        color: colors.white,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: colors.primary,
        width: '70%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: colors.primary,
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})


  // useEffect(() => {

    //     const auth = getAuth(app);

    //     console.log(authContext.user);

    //     console.log('use effect in summary called.');
    //     // Q: it seems this only be called once and not refreshed everytime this screen loads
    //     signInWithEmailAndPassword(auth, authContext.user.email, authContext.user.password)

    //         .then((userCredential) => {
    //             // Signed in 
    //             const db = initializeFirestore(app, {
    //                 experimentalForceLongPolling: true,
    //             });

    //             console.log("query passwds using auth context: " + authContext.user.user + ", password = " + authContext.user.password);

    //             const q = query(collection(db, "passwds"),
    //                 where('user', '==', authContext.user.user), orderBy('name'));

    //             const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //                 const output = [];
    //                 querySnapshot.forEach((doc) => {
    //                     // console.log(doc.data());
    //                     return (output.push({ id: doc.id, data: doc.data(), key: doc.data().name, value: doc.data().name, }));
    //                 });

    //                 setPasswds([]);
    //                 setPasswds(output);
    //                 setFilteredPasswds([]);
    //                 setFilteredPasswds(output);
    //             });

    //             return () => { unsubscribe(); }

    //         }).catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode + ': ' + errorMessage);
    //         });

    // }, []);