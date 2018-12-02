import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import {Actions} from 'react-native-router-flux';


export default class Signupform extends Component<{}> {

    render() {
        return (
            //<KeyboardAvoidingView style={styles.wrapper}>
            <View style={styles.container}>
                <TextInput style={styles.boxInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Username"
                           onChangeText={(username) => this.setState({username})}
                           underlineColorAndroid='transparent'/>

                <TextInput style={styles.boxInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email"
                           onChangeText={(username) => this.setState({username})}
                           underlineColorAndroid='transparent' onSubmitEditing={() => this.password.focus()}/>

                <TextInput style={styles.boxInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password"
                           onChangeText={(password) => this.setState({password})}
                           underlineColorAndroid='transparent' secureTextEntry={true}
                           ref={(input) => this.password = input}/>

                <TouchableOpacity style={styles.button} onPress={this.login}>
                    <Text style={styles.textButton}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
            //</KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxInput: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 10
    },
    button: {
        backgroundColor: '#546e7a',
        borderRadius: 25,
        width: 300,
        marginVertical: 10,
        paddingVertical: 13
    },
    textButton: {
        fontSize: 16,
        fontWeight : '500',
        color: '#ffffff',
        textAlign: 'center'
    }

});
