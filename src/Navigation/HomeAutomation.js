import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../Views/Dashboard';
import Settings from '../Views/Settings';
import Lights from '../Views/Lights';
import Audio from '../Views/Audio';
import Login from "../Views/Login";

export default createStackNavigator(
  {
    Login,
    Dashboard,
    Lights,
    Settings,
    Audio
  },
  {
    initialRouteName: 'Login',
  },
);
