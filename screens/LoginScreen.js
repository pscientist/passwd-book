import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
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

const validationSchema = Yup.object().shape({
  //TODO: valuation
  //email: Yup.string().required().min(3).label("Email"),
  //password: Yup.string().required().min(3).label("Password"),
});

const key = 'shh';

// username: cathy@mail.com, password: 654321
// username: john@mail.com, password: 123456
const LoginScreen = ({ navigation }) => {

  const myAuthContext = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [loggedInErrorMsg, setLoggedInErrorMsg] = useState('');

  useEffect(() => {
    const auth = getAuth(app);
    auth
      .signOut()
      .then(() => {
        myAuthContext.setUser('');// set app-wide user
        AuthStorage.removeToken(AuthStorage.authToken);
        console.log('Logged out.');
      })
      .catch(error => alert(error.message));
  }, []);

  /* Handle forgot password */
  const handleForgotPwd = () => {
    navigation.navigate('ForgotPwdScreen');
  }


  /* Handle Login */
  const handleLogin = async (values) => {

    const auth = getAuth(app);

    ///// TODO: remove the HARDCODE ////////
    // signInWithEmailAndPassword(auth, "cathy@mail.com", "123456")
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const db = initializeFirestore(app, {
          experimentalForceLongPolling: true,
        });

        // Find the data in the user_profile
        const q = query(collection(db, "user_profiles"),
          where('email', '==', userCredential.user.email));

        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // set local storage
            AuthStorage.storeToken(JWT.encode(doc.data(), key));
            // set the Context
            myAuthContext.setUser(doc.data());
          });
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
          email: '',
          password: ''
        }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={loggedInErrorMsg} visible={error}>
        </ErrorMessage>

        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.promptText}>
            Please login:</Text>
        </View>

        <FormField
          maxLength={255}
          name="email"
          placeholder="Email"
          autoFocus={true}
          autoCapitalize="none"
          autoCorrect={false}
          labelText="Email"
        ></FormField>

        <FormField
          maxLength={255}
          name="password"
          placeholder="Password"
          autoCapitalize="none"
          labelText="Password"
          autoCorrect={false}
          secureTextEntry
        ></FormField>

        <TouchableWithoutFeedback onPress={handleForgotPwd}>
          <View>
            <Text style={styles.linkText} >Forgot my Password</Text>
          </View>
        </TouchableWithoutFeedback>
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "#eee",
    fontSize: 16,
    textDecorationLine: 'underline'
  },

  promptText: {
    color: "#ccc",
    fontWeight: '500',
    fontSize: 20,
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

export default LoginScreen