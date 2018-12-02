import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Whereto from './pages/Whereto'

export default class Routes extends Component<{}> {
    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                  <Scene key="login" component={Login} title="Login" initial={true}/>
                  <Scene key="signup" component={Signup} title="Register"/>
                    <Scene key="main" component={Main} title="Main"/>
                    <Scene key="whereto" component={Whereto} title="Whereto"/>
                </Stack>
            </Router>

        )
    }
}