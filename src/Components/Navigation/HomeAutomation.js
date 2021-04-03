import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Dashboard from "../../Views/Dashboard";
import Settings from "../../Views/Settings";
import Lights from "../../Views/Lights"

export default createStackNavigator(
  {
    Dashboard,
    Settings,
    Lights,
  },
  {
    initialRouteName: "Lights",
  }
);
