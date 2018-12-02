import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class Logo extends Component<{}> {
    whereto(){
        Actions.whereto()
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.whereto}>
                    <Image source={require('../img/direction.png')}/>
                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -100,
        left: 140,
    },
});
