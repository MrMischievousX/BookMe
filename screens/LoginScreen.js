import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { asyncSetUser } from '../reduxConfig/actions';
import { useSelector, useDispatch } from 'react-redux';
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
    const [initializing, setInitializing] = useState(true);
    const { user } = useSelector((state) => state);
    const dispatch = useDispatch();

    function onAuthStateChanged(user) {
        if (initializing) setInitializing(false);
    }

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            dispatch(asyncSetUser(userInfo.user));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    useEffect(() => {
        if (user) {
            const isSignedIn = async () => {
                const isSignedIn = await GoogleSignin.isSignedIn();
                isSignedIn && navigation.navigate('Home')
            };
            isSignedIn()
        }
    }, [user]);

    if (initializing) return null;

    return (
        <View style={styles.background}>
            <Text style={styles.welcome}>Welcome</Text>
            <GoogleSigninButton
                style={{ width: 270, height: 60, marginTop: 20 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={onGoogleButtonPress}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: windowHeight / 4
    },
    welcome: {
        fontSize: 70,
        fontWeight: "900",
        fontFamily: "sans-serif",
        letterSpacing: 2
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: 1,
        marginVertical: 5
    }
})

export default LoginScreen;