import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AuthContext from "../auth/context";
import app from '../my_firebase';
import {
    setDoc, doc, collection,
    getFirestore, addDoc, initializeFirestore
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
} from "../components/forms";

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required().min(3).max(80).label("First Name"),
    lastname: Yup.string().required().min(3).max(80).label("Last Name"),
    email: Yup.string().required().min(10).max(100).label("Email"),
    user: Yup.string().required().min(3).max(50).label("Username"),
    password: Yup.string().required().min(7).max(50).label("Password"),
});

const RegisterScreen = () => {
    const authContext = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [loggedInErrorMsg, setLoggedInErrorMsg] = useState('');

    const handleSignUp = async (values) => {
        const auth = getAuth(app);
        // const db = getFirestore(app);

        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {

                // console.log("user credential");
                // console.log(userCredential);

                const userEntry = {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    user: values.user,
                    email: values.email,
                    password: values.password
                };

                const db = initializeFirestore(app, {
                    experimentalForceLongPolling: true,
                });

                /// add the user to the user profile
                addDoc(collection(db, "user_profiles"), userEntry).then((res) => {
                    console.log(res);
                    console.log(userEntry);

                    authContext.setUser(userEntry);// set app-wide user
                })
                    .catch(error => {
                        setError(true);
                        console.log("Error: " + error.message)
                        setLoggedInErrorMsg(error.message);
                    });
            })
            .catch((error) => {
                setError(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ': ' + errorMessage);
                setLoggedInErrorMsg(errorMessage);
            });
    }

    return (
        <Screen style={{ padding: 10 }}>
            <Form
                initialValues={{
                    user: '',
                    email: '',
                    firstname: '',
                    lastname: '',
                    password: ''
                }}
                onSubmit={(values) => handleSignUp(values)}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={loggedInErrorMsg} visible={error}>
                </ErrorMessage>

                <FormField
                    maxLength={255}
                    name="firstname"
                    placeholder="First name"
                    autoCorrect={false}
                    autoFocus={true}
                    returnKeyType={"next"}
                    labelText="First Name"
                ></FormField>

                <FormField
                    name="lastname"
                    placeholder="Last name"
                    autoCorrect={false}
                    labelText="Last Name"
                ></FormField>

                <FormField
                    name="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    labelText="Email"
                ></FormField>

                <FormField
                    name="user"
                    placeholder="Username"
                    autoCapitalize="none"
                    autoCorrect={false}
                    labelText="Username"
                ></FormField>

                <FormField
                    name="password"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    labelText="Password"
                ></FormField>

                <FormField
                    name="password_again"
                    placeholder="Password Again"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    labelText="Password Again"
                ></FormField>

                <SubmitButton title="Register" />
            </Form>
        </Screen>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    appTitle: {
        marginBottom: 15,

    },
    appTitleText: {
        fontWeight: "700",
        fontSize: 25,
        color: 'darkblue'
    },
    tagline: {
        marginBottom: 15,
    },
    taglineText: {
        fontSize: 16
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: colors.primary,
        width: '100%',
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
    buttonOutlineText: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 16,
    },
})
