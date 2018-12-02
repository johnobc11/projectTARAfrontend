import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions } from "react-native";
import AsyncStorage from "react-native";
import Whereto from "../pages/Whereto";


const { width, height } = Dimensions.get("window");

export default class Findadestinationform extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            goingto: '',
        }
    }

    fetchDirections = () => {
        /*navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.setState({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    error: null,
                });*/
        //directions api
        var apiDirectionskey = 'AIzaSyC3ibZvBAcrSMHrtVEaCQY2gW-Hbu6bne8';
        //const {location} = this.state;
        //const {latitude} = this.state;
        //const {longitude} = this.state;
        const {goingto} = this.state;


        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + this.props.latitude, +',' + this.props.longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson3) => {

                console.log(responseJson3);
                /*let points = Polyline.decode(responseJson3.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                this.setState({coords:coords})
                return coords*/
            });
    }





    render(){

        return(
            <View style={styles.container}>
                <TextInput style={styles.boxInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Going To?"
                           underlineColorAndroid='transparent'
                           onChangeText={(dest) => this.setState({goingto : dest})}
                />
                <TouchableOpacity style={styles.button} onPress={this.fetchDirections.bind(this)}>
                    <Text style={styles.textButton}> Go {this.props.type}</Text>
                </TouchableOpacity>



            </View>
        )

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: -110,
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
