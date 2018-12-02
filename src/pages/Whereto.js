import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';



import Mainlogo from '../components/Mainlogo';
//import Findadestinationform from "../components/Findadestinationform";

import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import Polyline from "@mapbox/polyline/src/polyline";
import MainService from "../services/mainservice";

/*let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 60 //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO*/

const { width, height } = Dimensions.get('window');
const halfHeight = height / 2;

export default class Whereto extends Component<{}> {

    state = {
        loaded: false
    }

    constructor(props) {
        super(props);
        MainService.load(v => this.setState({loaded: true}));

        this.state = {
            latitude: null,
            longitude: null,
            location: null,
            error: null,
            markers: [],
            arrivaldetails: [],
            coordinates: [],
            departurelocation : [],
            arrivallocation: [],
            condepartloc: [],
            arrvconloc: [],
            busstopname : '',
            departbustime: '',
            arrivstopname: '',
            arrivbustime: '',
            goingto: '',

        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });

                //geocode api
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

                //nearby api
                var apiPlaceskey = 'AIzaSyCW9gTt-YRr-B2mdKlPgwJytwvMBwpBQgg';
                //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

                fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + position.coords.latitude + ',' + position.coords.longitude + '&radius=2000&type=bus_station&key=' + apiPlaceskey)
                    .then((respplaces) => respplaces.json())
                    .then((responseJson2) => {

                        const markers = responseJson2.results.map((result) => ({
                            latlng: {
                                latitude: result.geometry.location.lat,
                                longitude: result.geometry.location.lng,
                            }
                        }));

                        this.setState({markers});
                    });


            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

    }

    fetchDirections = () => {
        //directions api
        var apiDirectionskey = 'AIzaSyC3ibZvBAcrSMHrtVEaCQY2gW-Hbu6bne8';
        //const {location} = this.state;
        const {latitude} = this.state;
        const {longitude} = this.state;
        const {goingto} = this.state;


        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + latitude + ',' + longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson3) => {

                let points = Polyline.decode(responseJson3.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                this.setState({coordinates: coords})
                return coords

            });

        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + latitude + ',' + longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson4) => {
                //const departureloc1 = responseJson4.routes[0].legs[0].steps[1];
                const departureloc = responseJson4.routes[0].legs[0].steps[1].transit_details.departure_stop.location;
                //console.log(departureloc);

                //const departureloc1 = responseJson4.routes[0].legs[0].steps[3]
                //console.log(departureloc1)

                const stopmarkers = Object.keys(departureloc).map(value => {
                    // noinspection JSAnnotator
                    if (!(typeof departureloc['lat'] === undefined && typeof departureloc['lng'] === undefined)) {
                         return {
                             slatlng: {
                                 latitude: departureloc['lat'],
                                 longitude: departureloc['lng']

                             }
                         }
                    } else {
                        console.log('null');
                    }
                });
                this.setState({
                    departurelocation: stopmarkers})

            })

        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + latitude + ',' + longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson5) => {
                //const departureloc1 = responseJson4.routes[0].legs[0].steps[1];
                //console.log(departureloc1)
                const arrivalloc = responseJson5.routes[0].legs[0].steps[1].transit_details.arrival_stop.location;
                //console.log(departureloc);

                const stopmarkers2 = Object.keys(arrivalloc).map(value => {
                    // noinspection JSAnnotator
                    if (!(typeof arrivalloc['lat'] === undefined && typeof arrivalloc['lng'] === undefined)) {
                        return {
                            flatlng: {
                                latitude: arrivalloc['lat'],
                                longitude: arrivalloc['lng']

                            }
                        }
                    } else {
                        console.log('null');
                    }
                });
                this.setState({
                    arrivallocation: stopmarkers2})

            })

        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + latitude + ',' + longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson6) => {
                //const departureloc1 = responseJson4.routes[0].legs[0].steps[1];
                //console.log(departureloc1)
                const departstopname = responseJson6.routes[0].legs[0].steps[1].transit_details;
                console.log(departstopname);

                this.setState({
                    busstopname: departstopname.departure_stop.name,
                    departbustime: departstopname.departure_time.text,
                    arrivstopname: departstopname.arrival_stop.name,
                    arrivbustime: departstopname.arrival_time.text,

                })

            })

        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + latitude + ',' + longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson7) => {
                //const departureloc1 = responseJson4.routes[0].legs[0].steps[1];
                //console.log(departureloc1)
                const departureloc1 = responseJson7.routes[0].legs[0].steps[3].transit_details.departure_stop.location;
                console.log(departureloc1);

                const connectionmark = Object.keys(departureloc1)[1].map(value => {

                    console.log(connectionmark)
                    // noinspection JSAnnotator
                    /*if (!(typeof departureloc1['lat'] === undefined && typeof departureloc1['lng'] === undefined)) {
                        return {
                            clatlng: {
                                latitude: departureloc1['lat'],
                                longitude: departureloc1['lng']

                            }
                        }
                    } else {
                        console.log('null');
                    }*/
                });
                //this.setState({
                   // condepartloc: connectionmark})

            })

        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + latitude + ',' + longitude + '&destination=' + goingto + '&mode=transit&transit_mode=bus&key=' + apiDirectionskey)
            .then((resdirections) => resdirections.json())
            .then((responseJson8) => {
                //const departureloc1 = responseJson4.routes[0].legs[0].steps[1];
                //console.log(departureloc1)
                const arrivalloc1 = responseJson8.routes[0].legs[0].steps[3].transit_details.arrival_stop.location;
                //console.log(departureloc);

                const connectionmark1 = Object.keys(arrivalloc1).map(value => {
                    // noinspection JSAnnotator
                    if (!(typeof arrivalloc1['lat'] === undefined && typeof arrivalloc1['lng'] === undefined)) {
                        return {
                            cflatlng: {
                                latitude: arrivalloc1['lat'],
                                longitude: arrivalloc1['lng']

                            }
                        }
                    } else {
                        console.log('null');
                    }
                });
                this.setState({
                    arrvconloc: connectionmark1})

            })


    }




    render(){
        const actuallatitude = this.state.latitude;
        const actuallongitude = this.state.longitude;
        const neareststoparea = this.state.markers;
        const directioncoordinates = this.state.coordinates;
        const startingstop = this.state.busstopname;
        const starttime = this.state.departbustime;
        const finalstop = this.state.arrivstopname;
        const finaltime = this.state.arrivbustime;

        return(

            <View style={styles.container}>
                <Mainlogo/>
                <TextInput style={styles.boxInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Going To?"
                           underlineColorAndroid='transparent'
                           onChangeText={(dest) => this.setState({goingto : dest})}
                />

                <TouchableOpacity style={styles.button} onPress={this.fetchDirections.bind(this)}>
                    <Text style={styles.textButton}> Go {this.props.type}</Text>
                </TouchableOpacity>

                <Text style={styles.travelInfor}> <Text style={{fontWeight: "bold"}}> Board this bus-{"\n"} </Text>
                    Departure stop: <Text style={{fontWeight: "bold"}}> {startingstop}{"\n"} </Text>
                    Departure time: <Text style={{fontWeight: "bold"}}> {starttime}{"\n"} </Text>
                    Final Stop: <Text style={{fontWeight: "bold"}}> {finalstop}{"\n"} </Text>
                    Arrival time: <Text style={{fontWeight: "bold"}}> {finaltime}{"\n"} </Text>
                </Text>


                {this.state.loaded ?
                    <MapView style={styles.map}
                         region={{
                             latitude: actuallatitude,
                             longitude: actuallongitude,
                             latitudeDelta: 0.02,
                             longitudeDelta: 0.02
                         }}
                >

                    <MapView.Marker
                        coordinate={{
                            latitude: actuallatitude,
                            longitude: actuallongitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02
                        }}
                        image={require('../img/my-pin-512.png')}
                        title={'you are here'}
                    />

                    {neareststoparea.map(marker => (
                        <MapView.Marker
                            coordinate={marker.latlng}
                            image={require('../img/busstop.png')}

                        />

                    ))}


                    <MapView.Polyline
                        coordinates={directioncoordinates}
                        strokeWidth={5}
                        strokeColor="#6f949b"/>

                    {this.state.departurelocation.map(marker => (
                        <MapView.Marker
                            coordinate={marker.slatlng}
                            image={require('../img/busstop1.png')}
                            title={'board here'}

                        />

                    ))}

                        {this.state.arrivallocation.map(marker => (
                            <MapView.Marker
                                coordinate={marker.flatlng}
                                image={require('../img/busstop2.png')}
                                title={'stop here'}

                            />

                        ))}


                        {this.state.condepartloc.map(marker => (
                            <MapView.Marker
                                coordinate={marker.clatlng}
                                image={require('../img/busstop1.png')}
                                title={'stop here'}

                            />

                        ))}

                        {this.state. arrvconloc.map(marker => (
                            <MapView.Marker
                                coordinate={marker.cflatlng}
                                image={require('../img/busstop2.png')}
                                title={'stop here'}

                            />

                        ))}


                </MapView>  : <Text style={{fontWeight: 'bold', color: '#546e7a', textAlign: 'center'}}>Please wait.. loading</Text>}


            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        width,
        height: halfHeight
    },
    travelInfor: {
      position: 'absolute',
      top: 100,
        left: 20,
    },
    boxInput: {
        position: 'absolute',
        top: 245,
        left: 50,
        width: 180,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        marginVertical: 10
    },
    button: {
        position: 'absolute',
        top: 230,
        left: 240,
        backgroundColor: '#546e7a',
        borderRadius: 25,
        width: 80,
        marginVertical: 8,
        paddingVertical: 13
    },
    textButton: {
        fontSize: 16,
        fontWeight : '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
