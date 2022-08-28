import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text, Image } from "react-native";
import Button from "../components/Button";
import * as Font from 'expo-font';

function WelcomeScreen({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            // Load a font `Orbitron` from a static resource
            Orbitron: require('../assets/fonts/Orbitron-Medium.ttf'),

            // Any string can be used as the fontFamily name. Here we use an object to provide more control
            'Orbitron-Bold': {
                uri: require('../assets/fonts/Orbitron-Bold.ttf'),
                display: Font.FontDisplay.FALLBACK,
            },
        });
        setFontsLoaded(true);
    }


    useEffect(() => {
        loadFonts();
    });

    if (fontsLoaded) {
        return (
            <ImageBackground
                blurRadius={9}
                style={styles.background}
                source={require("../assets/person_working.png")}
                resizeMode="cover"
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Password Genuis</Text>
                    <Text style={styles.tagline}> Security & Ease - Your Way </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Register"
                        onPress={() => navigation.navigate("RegisterScreen")}
                    />
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate("LoginScreen")}
                    />
                </View>

            </ImageBackground>
        );
    } else {
        return (<Text> Error loading fonts. </Text>)
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    title: {
        fontFamily: 'Orbitron-Bold',
        fontSize: 26,
        // backgroundColor: 'lightblue',
        color: "navy",
        textTransform: "uppercase",
        fontWeight: "800",
        paddingTop: 70,
        padding: 15
    },
    tagline: {
        fontSize: 14,
        fontFamily: 'Orbitron',
        marginBottom: 10,
        letterSpacing: 1
    }
});

export default WelcomeScreen;
