import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';
//import Main from '../pages/Main';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component<{}> {

  signup(){
    Actions.signup()
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type="Login"/>
        <View style={styles.contsignupText}>
            <Text style={styles.textSigup}>Create an account here - </Text>
            <TouchableOpacity onPress={this.signup}><Text style={styles.buttonSignup}>Signup</Text></TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contsignupText: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: 'row'
  },
  textSigup: {
    color: '#78909c',
    fontSize: 16
  },
  buttonSignup: {
    fontSize: 16,
    fontWeight: '500'
  }
});