import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthContext from "../auth/context";
import * as Yup from "yup";
import app from '../my_firebase';

import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";
import colors from "../config/colors";
import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen";
import { setDoc, doc, getFirestore } from "firebase/firestore";


const validationSchema = Yup.object().shape({
    // oldPwd: Yup.string().required().min(3).max(50).label("Old Password"),
    // newPwd: Yup.string().required().min(3).max(80).label("New Password"),
    // newPwd2: Yup.string().required().min(3).max(80).label("New Password Again"),
});

const ChangePwdScreen = ({ route }) => {
    const authContext = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    /*
     * Handle Change of password
     */
    const handleChangePwd = (values) => {
        const contextUser = authContext.user;
        // const contextUserId = authContext.id;
        const userObj = getAuth().currentUser;
        const authObj = EmailAuthProvider.credential(contextUser.email, values.oldPwd);
        const db = getFirestore(app);

        // if (contextUser.password == values.oldPwd) {
        reauthenticateWithCredential(userObj, authObj).then(() => {
            updatePassword(userObj, values.newPwd).then(() => {

                // console.log(values);
                // console.log(contextUser);

                // // update password in the user_profiles as well
                // setDoc(doc(db, "user_profiles", contextUser), {
                //     password: values.newPwd
                // }).then(() => {
                //     console.log('Update password in the user_profiles table with ' + values.newPwd)
                //     setError(false);
                // })
                //     .catch(error => { setError(true); console.log(error.message) });

                // // Update successful.
                console.log('Update successful');
            }).catch((error) => {
                // An error happened.
                console.log('Update error.');
                console.log(error);
            });
        }).catch((error) => {
            // An error happened.
            console.log('Reauthenticate error.');
            console.log(error);
        });
        // } else {
        // console.log('existing password incorrect');
        // console.log("context user password = ")
        // console.log(contextUser.user.password);
        // console.log(values.oldPwd);
        // }
    }

    return (
        <Screen style={{ padding: 10 }}>
            <Form
                onSubmit={(values) => handleChangePwd(values)}
                validationSchema={validationSchema}
                initialValues={{
                    oldPwd: '',
                    newPwd: '',
                    newPwd2: ''
                }}
            >
                <ErrorMessage error={errorMsg} visible={error}>
                </ErrorMessage>

                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.promptText}>
                        Password Update</Text>
                </View>
                <FormField
                    maxLength={255}
                    name="oldPwd"
                    placeholder="Old Password"
                    labelText="Old Password"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                // defaultValue="123456"
                // secureTextEntry
                ></FormField>

                <FormField
                    maxLength={255}
                    name="newPwd"
                    labelText="New Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                // defaultValue="654321"
                // secureTextEntry
                ></FormField>

                <FormField
                    maxLength={255}
                    name="newPwd2"
                    placeholder="New Password Again"
                    labelText="New Password Again"
                    autoCapitalize="none"
                    autoCorrect={false}
                // defaultValue="654321"
                // secureTextEntry
                ></FormField>

                <SubmitButton title="Update" />
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

export default ChangePwdScreen