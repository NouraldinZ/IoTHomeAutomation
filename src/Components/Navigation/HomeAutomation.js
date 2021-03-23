import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Dashboard from "../../Views/Dashboard";
import Settings from "../../Views/Settings";

export default createStackNavigator(
  {
    Dashboard,
    Settings,
  },
  {
    initialRouteName: "Dashboard",
  }
);
