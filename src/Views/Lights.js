/**  Lights Module View  **/

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Lights extends Component {
  constructor() {
    super();
    this.state = {
      lightsOn: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.toggleLight = this.toggleLight.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <h3>Light Status: {this.state.lightsOn ? 'ON' : 'OFF'}</h3>
        <button onClick={this.toggleLight}>
          Toggle Light Switch
        </button>
      </View>
    );
  }

  toggleLight(){
    console.log(!this.state.lightsOn);
    this.setState(state => ({
      lightsOn: !state.lightsOn
    }));
    // TODO: Send request to Raspberry-Pi to toggle lights switch
  }
}
export default Lights;
