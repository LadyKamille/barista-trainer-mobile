import React, { useState }  from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Facebook from 'expo-facebook';

import getEnvVars from '../environment';
const { facebookAppId } = getEnvVars();

const Login = () => {
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = async () => {
    debugger;
    try {
      await Facebook.initializeAsync({
        appId: facebookAppId.toString(),
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        setLoggedInStatus(true);
        setUserData(response);
      } else {
        Alert.alert(`Facebook Login Error: ${type}`);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  const logout = () => {
    setLoggedInStatus(false);
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      <Text>Login or Sign Up with Facebook</Text>
      {
        isLoggedIn && userData ?
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity> :
          <TouchableOpacity style={styles.loginBtn} onPress={login}>
            <Text style={{ color: "#fff" }}>Login with Facebook</Text>
          </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0
  },
});

export default Login;
