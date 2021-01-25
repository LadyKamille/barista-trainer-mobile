import React, { useState }  from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Facebook from 'expo-facebook';

import getEnvVars from '../../environment';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from './schema';
const { apiUrl, facebookAppId } = getEnvVars();

const Login = () => {
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = async () => {
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
        await facebookLoginSuccess();
      } else {
        Alert.alert(`Facebook Login Error: ${type}`);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  const facebookLoginSuccess = async () => {
    try {
      const response = await fetch(`${ apiUrl }/auth/facebook/callback`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return response;
    } catch(error) {
      console.log('error', error);
      return error;
    }
  };

  const loginSuccess = () => {
    const [login] = useMutation(LOGIN_MUTATION, {
      variables: {
        email: formState.email,
        password: formState.password
      },
      onCompleted: ({ login }) => {
        localStorage.setItem(AUTH_TOKEN, login.token);
      }
    });
  };

  const logout = () => {
    setLoggedInStatus(false);
    setUserData(null);
  };

  return (
    isLoggedIn && userData ?
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity> :
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={{ color: "#fff" }}>Login with Facebook</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default Login;
