import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthContext from "../auth/context";
import * as Yup from "yup";
import app from '../my_firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import colors from "../config/colors";
import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen";
import { initializeFirestore, collection, query, where, getDocs } from "firebase/firestore";
import AuthStorage from '../auth/storage';
import JWT from 'expo-jwt';
import { renderNode } from 'react-native-elements/dist/helpers';

const validationSchema = Yup.object().shape({
    oldPwd: Yup.string().required().min(3).max(50).label("Old Password"),
    newPwd: Yup.string().required().min(3).max(80).label("New Password"),
    newPwd2: Yup.string().required().min(3).max(80).label("New Password Again"),
});

const ForgotPwdScreen = () => {
    const authContext = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // var actionCodeSettings = {
    //     url: 'https://www.example.com/?email=user@example.com',
    //     iOS: {
    //         bundleId: 'com.example.ios'
    //     },
    //     android: {
    //         packageName: 'com.example.android',
    //         installApp: true,
    //         minimumVersion: '12'
    //     },
    //     handleCodeInApp: true
    // };
    // firebase.auth().sendPasswordResetEmail(
    //     'user@example.com', actionCodeSettings)
    //     .then(function () {
    //         // Password reset email sent.
    //     })
    //     .catch(function (error) {
    //         // Error occurred. Inspect error.code.
    //     });

    /**
     * Handle password change
     * 
     * @param {*} values 
     */
    const handleChangePwd = (values) => {
        const auth = getAuth(app);

        auth.sendPasswordResetEmail(
            values.password, actionCodeSettings)
            .then(function () {
                // Password reset email sent.
            })
            .catch(function (error) {
                // Error occurred. Inspect error.code.
            });
    }

    return (
        <Screen style={{ padding: 10 }}>
            <Form
                initialValues={{
                    oldPwd: '',
                    newPwd: '',
                    newPwd2: ''
                }}
                onSubmit={(values) => handleChangePwd(values)}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={errorMsg} visible={error}>
                </ErrorMessage>

                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.promptText}>
                        Forgot Password</Text>
                </View>
                <FormField
                    maxLength={255}
                    name="email"
                    placeholder="Email"
                    labelText="Email"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                ></FormField>

                <SubmitButton title="Reset" />
            </Form>
        </Screen>
    );
}


const styles = StyleSheet.create({
    promptText: {
        color: "#ccc",
        fontWeight: '500',
        fontSize: 20,
        fontFamily: 'Orbitron'
    },

    labelTextWrap: {
        backgroundColor: 'red',
        marginBottom: -5
    },

    labelText: {
        color: "#ccc",
        fontSize: 18,
        fontFamily: 'Orbitron'
    },

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
        // color: '#666666',
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
        paddingVertical: 5,
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

export default ForgotPwdScreen