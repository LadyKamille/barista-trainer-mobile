import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from '../components/UserAuth/Login';

const SignInScreen = () => (
  <View style={styles.container}>
    <Text>Login or Sign Up with Facebook</Text>
    <Login/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen;
