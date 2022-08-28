import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Button, TextInput } from "react-native";
import * as Yup from "yup";
import app from '../my_firebase'
import {
    setDoc, doc, collection,
    getFirestore, addDoc
} from "firebase/firestore";
import {
    Form,
    FormField,
    SubmitButton,
    ErrorMessage,
    FormImagePicker
} from "../components/forms";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";


const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(50).label("Title"),
    username: Yup.string().required().min(3).max(80).label("Username"),
});

function PasswordEditScreen({ navigation, route }) {
    const [error, setError] = useState(false);
    const passwd = route.params?.passwd;
    const authContext = useContext(AuthContext);
    const [hideLetters, setHideLetters] = useState(false);

    const handleUpdate = async (values) => {
        const db = getFirestore(app);

        ////// Edit an entry //////
        if (values.id) {
            setDoc(doc(db, "passwds", values.id), {
                name: values.name,
                passwd: values.passwdValue ? values.passwdValue : '',
                username: values.username,
                notes: values.notes ? values.notes : '',
                hints: values.hints ? values.hints : '',
                user: authContext.user.user
            }).then(() => {
                setError(false);
                navigation.navigate('PasswdsSummaryScreen')
            })
                .catch(error => { setError(true); console.log(error.message) });

            // //// Add a new entry  //////   
        } else {
            addDoc(collection(db, "passwds"), {
                name: values.name,
                passwd: values.passwdValue ? values.passwdValue : '',
                username: values.username,
                notes: values.notes ? values.notes : '',
                hints: values.hints ? values.hints : '',
                user: authContext.user.user
            }).then((res) => {
                setError(false);
                navigation.navigate('PasswdsSummaryScreen')
            })
                .catch(error => { setError(true); console.log(error.message) });
        };
    }

    return (
        <Screen style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Form
                    initialValues={{
                        id: passwd?.id,
                        name: passwd?.data.name,
                        username: passwd?.data.username,
                        passwdValue: passwd?.data.passwd,
                        notes: passwd?.data.notes,
                        hints: passwd?.data.hints,
                        user: authContext.user.user.user, // join key to the passwds table
                        images: []
                    }}
                    onSubmit={(values) => handleUpdate(values)}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Error saving data" visible={error}>
                    </ErrorMessage>

                    <FormField
                        defaultValue={passwd?.data.name}
                        maxLength={255}
                        name="name"
                        placeholder="Title"
                        labelText="Title"
                        width="80%"
                        formStyles={{ color: '#333' }}
                    ></FormField>

                    <FormField
                        defaultValue={passwd?.data.username}
                        name="username"
                        placeholder="Username"
                        autoCapitalize="none"
                        autoCorrect={false}
                        labelText="Username"
                    ></FormField>

                    <FormField
                        defaultValue={passwd?.data.passwd}
                        name="passwdValue"
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        labelText="Password"
                    ></FormField>

                    <FormField
                        defaultValue={passwd?.data.hints}
                        name="hints"
                        placeholder="Hints"
                        labelText="Hints"
                    ></FormField>

                    <FormField
                        defaultValue={passwd?.data.notes}
                        name="notes"
                        placeholder="Notes"
                        labelText="Additional Details"
                        multiline
                        numberOfLines={10}
                    ></FormField>

                    {/* <View>
                        <Button title="Pick an image from camera roll" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View> */}

                    <SubmitButton title="Save" />
                </Form>
            </ScrollView >
        </Screen >
    );
}

const styles = StyleSheet.create({
    fieldLabel: {
        marginLeft: 13,
        fontStyle: "italic",
    },
    fieldBgColor: { backgroundColor: "silver", },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    scrollView: {
        // backgroundColor: '#ccc',
        padding: 15,
    },
    container: {
        padding: 10,
    },
    hidden: {
        width: 30,
        height: 30,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        width: 200,
    },
});
export default PasswordEditScreen;
