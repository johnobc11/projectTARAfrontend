/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';


import Routes from './src/Routes';

import Login from './src/pages/Login';
//import Signup from './src/pages/Signup';
//import Main from './src/pages/Main';

/*const Application = StackNavigator({
    Home: {screen: Login},
    Profile: {screen: Main}
    }, {
        navigationOptions: {
            header: false,
        }
});*/
console.disableYellowBox = true;
export default class App extends Component<{}> {
  render() {
    return (

             <View style = {styles.container}>
              <StatusBar
                  backgroundColor="#546e7a"
                  barStyle="light-content"
                  />
                  <Routes/>
             </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78909c',

  }
  /*container2: {
    flex: 1,

  }*/
});
