import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class MainLogo extends Component<{}> {
    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../img/TARA9.png')}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
});
