import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';
//import Form from '../components/Form';
import Signupform from '../components/Signupform';


import {Actions} from 'react-native-router-flux';
``
export default class Signup extends Component<{}> {
    login(){
        Actions.login()
    }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Signupform type="Signup"/>
        <View style={styles.contsignupText}>
            <Text style={styles.textSigup}>Have an account? - </Text>
            <TouchableOpacity onPress={this.login}><Text style={styles.buttonSignup}>Signin</Text></TouchableOpacity>

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
  },

  boxInput: {
          width: 300,
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: 25,
          paddingHorizontal: 12,
          fontSize: 16,
          marginVertical: 9
      },
});