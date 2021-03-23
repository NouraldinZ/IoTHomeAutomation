/**  User's Main Dashboard View  **/

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Nour's test</Text>
      </View>
    );
  }
}

export default Dashboard;
