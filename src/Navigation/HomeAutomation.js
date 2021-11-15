import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../Views/Dashboard';
import Settings from '../Views/Settings';
import Lights from '../Views/Lights';
import Login from "../Views/Login";

export default createStackNavigator(
  {
    Login,
    Dashboard,
    Lights,
    Settings,
  },
  {
    initialRouteName: 'Login',
  },
);
