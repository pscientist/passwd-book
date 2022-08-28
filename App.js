import React, { useState, useEffect, useInsertionEffect } from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import JWT from 'expo-jwt';
import AuthContext from "./auth/context";
import AuthStorage from './auth/storage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const key = 'shh';

/**
 * Feature list
 *    - Change password
 *    - Forgot password
 * 
 * After logged in
 *    - Use Context for the logged in user (AuthContext) for the entire app
 *       (use the data from the user_profiles)
 *    - set the local storage s.t. there is no need to log in again next time
 *       (also use the data from the user_profiles)
 * 
 * The user_profiles table store the user details such as name, email, phone number 
 *        (actually no need to store the password because the authentication is against firebase users)
 * 
 * Next time opening the app
 *    - read from the local storage and set the user in the Context. 
 * 
 * For the password summary page
 *    - No need to authenticate again(?) because we already know the user from the local storage
 */


LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

export default function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      // Load a font `Orbitron` from a static resource
      Orbitron: require('./assets/fonts/Orbitron-Medium.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Orbitron-Bold': {
        uri: require('./assets/fonts/Orbitron-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  });


  // check for local storage for a jwt and decode
  // set the Context user to that decoded object
  const retrieveToken = async () => {
    const token = await AuthStorage.getToken();
    if (!token) return;
    setUser(JWT.decode(token, key));
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={retrieveToken} // check the local storage to see if user has already loggined in
        onFinish={() => setLoading(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? (<AppNavigator />) : (<AuthNavigator />)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});