import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

//import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder';


import Mainlogo from '../components/Mainlogo';
import Direction from '../components/Direction';
import MainService from "../services/mainservice";

/*const{width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITIDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITIDE_DELTA * ASPECT_RATIO*/

export default class Main extends Component<{}> {
//google maps geocoding api keys: AIzaSyBpcvTMBqfklAWdc3Obv1Bn2n5TpxAnwfo
    state = {
        loaded: false
    }

    /*constructor(){
        super();
        MainService.load(v => this.setState({loaded: true}));
    }*/


    constructor(props) {
        super(props);
        MainService.load(v => this.setState({loaded: true}));

        this.state = {

            latitude: null,
            longitude: null,
            location: null,
            error: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });

                var myApiKey = 'AIzaSyAC3SA39GYuBIDQXhus5TRM3WwiImtuzGs';

                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + myApiKey)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                        var locationName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t === 'administrative_area_level_2').length > 0)[0].short_name;
                        //console.log(locationName);
                        this.setState({
                            location: locationName,
                        })
                    })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );




    }

    getData(){

        /*var lat = this.state.latitude;
        var lng = this.state.longitude;
        var myApiKey = 'AIzaSyAC3SA39GYuBIDQXhus5TRM3WwiImtuzGs';

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + myApiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                var locationName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name;
            })
        /*Geocoder.geocodePosition(POS).then(res => {
            // res is an Array of geocoding object (see below)
            this.setState({
                loc: res,
            })
        })
            .catch(err => console.log(err))*/

    }
    render(){
        //Geocoder.geocodePosition(this.state.latitude,this.state.longitude)
        return (
        <View style={styles.container}>
            <Mainlogo/>
            {this.state.loaded ? <Direction/> : <Text style={{fontWeight: 'bold', color: '#546e7a', textAlign: 'center'}}>Please wait.. loading</Text>}
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            <Text>Location: {this.state.location} </Text>
        </View>

        );

        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
