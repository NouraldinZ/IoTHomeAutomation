import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {LineChart, Path} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as theme from '../Theme/theme';
import {Block, Text} from '../Components';
import mocks from '../Theme/settings';
import { LinearGradient } from 'expo-linear-gradient';

import {INTERVAL} from '../app_settings.js';
import * as common from '../API/common';
import Lights, {stopLightsStateUpdate} from "./Lights";

let humidityData = [0,0,0,0,0];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature:{
        celcius:20,
        farenheit: 70
      },
      humidity:0,
      humidityData:[20, 40, 30, 50, 70],
    };

    if (!Dashboard.app_settings.backgroundFetchTask.initialized) {
      this.backgroundFetch().then(r => {});
      Dashboard.app_settings.backgroundFetchTask.initialized = true;
    }
  }

  static app_settings = {
    backgroundFetchTask: {
      initialized: false,
      lights_initialized:false,
    },
    state: {
      // Lights Module State
      "lightsOn": true,
      "brightness": 0,
      "rgbMode": false,
      "color": { red: 255, blue: 0, green: 0 },

      // Motion Sensor Module State
      "motionDetected": false,
      "timestamp": 'defaultTimestamp',

      // Temperature & Humidity Module
      "temperature": { celcius: 22, farenheit: 73 },
      "humidity":10,
      //"date": Date,

      // Bluetooth Module
      // ...
    },
  };

  static navigationOptions = {
    header: null,
  };

  backgroundProcess = () => {
    common.fetchState().then(response => {
      //app_settings.state = state;
      if(response) {
        // Test Code
        /*console.log(response);
        Dashboard.app_settings.state.temperature.celcius += 1;
        Dashboard.app_settings.state.humidity +=1;
        Dashboard.app_settings.state.lightsOn = !Dashboard.app_settings.state.lightsOn;
        console.log(Dashboard.app_settings.state.temperature.celcius);
        console.log(humidityData);
        */

        console.log("Background fetch");
        Dashboard.app_settings.state = response;//COMMENT THIS LINE IF TESTING BACKGROUND TASK

        //Humidity data update
        humidityData.push(Dashboard.app_settings.state.humidity);
        humidityData.shift();

        // Update Temperature and Humidity state
        this.setState({
          temperature:{
            celcius:Dashboard.app_settings.state.temperature.celcius,
            farenheit:Dashboard.app_settings.state.temperature.farenheit
          },
          humidity:Dashboard.app_settings.state.humidity,
          humidityData:humidityData,
        });

        // TODO: Motion Detected Notification
        if (Dashboard.app_settings.state.motionDetected) {
        }
      }
    });
    // TODO: Check if still logged in
    //if (this.props.navigation.state.routeName = 'Login'){
    //clearInterval(intervalId);
    //}
  };

  async backgroundFetch(){
    //stopLightsStateUpdate();
    let intervalId = setInterval(this.backgroundProcess, INTERVAL);
  };

  render() {
    const {navigation, settings, lights} = this.props;
    const LightIcon = settings['light'].icon;
    const AudioIcon = settings['audio'].icon;
    const TempIcon = settings['temperature'].icon;
    const FanIcon = settings['fan'].icon;
    //const WiFiIcon = settings['wi-fi'].icon;
    //const ElectricityIcon = settings['electricity'].icon;
    return (
      <LinearGradient style={styles.background} colors={['#fcd6bd', '#72a5ff', '#408dff']} >
      <Block style={styles.dashboard}>
        <Block column style={{marginVertical: theme.sizes.base * 2}}>
          <Text size={26} bold name>Hello {this.props.navigation.state.params.username}!</Text>
        </Block>

        <Block row>
          <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
            <Text h1>{this.state.temperature.celcius}</Text>
            <Text h1 size={34} height={80} weight="600" spacing={0.1}>
              °C
            </Text>
          </Block>
          <Block flex={1} column>
            <Text name color={'grey'} size={18} >Humidity:   {this.state.humidity} %</Text>
            <LineChart
              yMax={100}
              yMin={0}
              data={this.state.humidityData}
              style={{flex: 0.8}}
              curve={shape.curveNatural}
              svg={{stroke: theme.colors.accent, strokeWidth: 3}}
            />
          </Block>
        </Block>
        <ScrollView
          contentContainerStyle={styles.buttons}
          showsVerticalScrollIndicator={false}
          >
          <Block column space="between">
            <Block
              column
              space="around"
              center
              style={{marginVertical: theme.sizes.base*3}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Lights', {name: 'light'})
                }>
                <Block center middle style={styles.button}>
                  <LightIcon size={38} />
                  <Text button style={{marginTop: theme.sizes.base * 0.5}}>
                    {settings['light'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            <Block
                column
                space="around"
                center
                style={{}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Audio', {name: 'audio'})}>
                <Block center middle style={styles.button}>
                  <AudioIcon size={38} />
                  <Text button style={{marginTop: theme.sizes.base * 0.5}}>
                    {settings['audio'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
          </Block>
        </ScrollView>
      </Block>
      </LinearGradient>
    );
  }
}

Dashboard.defaultProps = {
  settings: mocks,
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
    //backgroundColor: '#fac7c5',
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: Dimensions.get('window').width*0.75,
    height: 125,
    borderRadius: 75 / 2,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height,
  },
});
