import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Slider, View, Pressable, Dimensions} from 'react-native';
import { Switch } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../Theme/theme';
import {Block, Text, PanSlider} from '../Components';
import mocks from '../Theme/settings';
import {
  SliderHuePicker,
} from 'react-native-slider-color-picker';
import * as lightsApi from '../API/lightsApi';
import { LinearGradient } from 'expo-linear-gradient';
import * as common from "../API/common";
import {INTERVAL} from "../app_settings";
import Toast from "react-native-root-toast";
import Dashboard from "./Dashboard";

export let intervalId_processNewState = undefined;

export const stopLightsStateUpdate = function (){
	clearInterval(intervalId_processNewState);
}

class Lights extends Component {
  state = {
	lightsOn: true,
	brightness: 0,
	rgbMode: false,
  	color: {red: 255, blue: 0, green: 0},
  };

	processNewState = () =>{
	  let state = Dashboard.app_settings.state;
	  console.log("Lights - Updating State");
	  this.setState({
		  lightsOn: state.lightsOn,
		  brightness: state.brightness,
		  rgbMode: state.rgbMode,
		  color: state.color,
	  });
  };

  async triggerLightsBackgroundFetch() {
	intervalId_processNewState = setInterval(this.processNewState, INTERVAL);
  }

  renderController() {
	return (
	  <Block flex={1} right style={styles.controller}>
		<Block center style={styles.controllerValue}>
		  <Text color="white">34</Text>
		</Block>
		<Block flex={0.8} style={[styles.controllerOverlay]} />
	  </Block>
	);
  }

  toggleLight = () => {
	//console.log(this.state.brightness);
	//console.log(this.state.color);
	let lightState = this.state.lightsOn;
	let brightnessState = this.state.brightness;
	let rgbModeState = this.state.rgbMode;
	// Send request to Raspberry-Pi to toggle lights switch
  	lightsApi.toggleLights(!lightState, (!lightState? (rgbModeState? 9:(brightnessState > 0 ? brightnessState : 1)) : 0),
		rgbModeState, this.state.color).then(result => {
	  if(result) {
		  console.log("LIGHTS:", !this.state.lightsOn);
		  this.setState(state => ({
			  lightsOn: !state.lightsOn,
			  brightness: (!state.lightsOn ? (state.rgbMode ? 9 : (state.brightness > 0 ? state.brightness : 1)) : 0),
			  color: {red: 255, blue: 0, green: 0},
		  }));
	  } else {
		  Toast.show('Unable to execute! Check Network!', {
			  duration: Toast.durations.SHORT,
		  });
	  }
	})

  }

  updateBrightness = (value) => {
	//console.log(!this.state.lightsOn);
	//console.log(this.state.brightness);
	//Send request to Raspberry-Pi
	let result = lightsApi.changeBrightness(value);
	if(result) {
	  console.log("BRIGHTNESS:", value);
	  this.setState(() => ({
		brightness: value,
		lightsOn: value>0? true:false,
	  }));
	} else {
	  Toast.show('Unable to execute! Check Network!', {
	    duration: Toast.durations.SHORT,
	  });
	}
  }

  changeMode = (mode) => {
    //Send request to Raspberry-Pi
  	let result = lightsApi.toggleRgbMode(mode, this.state.color);
    if(result) {
	  console.log("RGB MODE:", mode);
	  this.setState(state => ({
		rgbMode: mode,
		brightness: mode?9:state.brightness,
	  }));
	} else {
	  Toast.show('Unable to execute! Check Network!', {
	    duration: Toast.durations.SHORT,
	  });
	}
  }

  changeColor = (colorHsvOrRgb, resType) => {
	if (resType == "end") {
		//console.log(colorHsvOrRgb.h);
		let rgb = this.HSVtoRGB(colorHsvOrRgb.h/360, 1, 1);
		console.log("RGB COLOR:", rgb);
		//Send request to Raspberry-Pi
		let result = lightsApi.changeColor(rgb);
		if(result) {
			console.log("RGB COLOR:", rgb);
			this.setState({
				color: rgb,
			});
		} else {
			Toast.show('Unable to execute! Check Network!', {
				duration: Toast.durations.SHORT,
			});
		}
	}
  }

  HSVtoRGB(h, s, v) {
	var r, g, b, i, f, p, q, t;
	if (arguments.length === 1) {
		s = h.s, v = h.v, h = h.h;
	}
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	return {
		red: Math.round(r * 255),
		green: Math.round(g * 255),
		blue: Math.round(b * 255)
	};
  }

  render() {
	const {navigation, settings} = this.props;
	const name = navigation.getParam('name');
	const Icon = settings[name].icon;
  	console.log(navigation.state.routeName === 'Lights');
  	if (!Dashboard.app_settings.backgroundFetchTask.lights_initialized) {
	  console.log("Initialized Lights Fetch");
	  this.triggerLightsBackgroundFetch().then(r => {});
	  Dashboard.app_settings.backgroundFetchTask.lights_initialized = true;
  	}
	return (
	  <Block flex={1} style={styles.settings}>
		<Block flex={1} center>
		  <Block column>
		  <Pressable
			style={({ pressed }) => [{ backgroundColor: pressed? 'rgb(210, 230, 255)': 'white'}]}
			onPress={this.toggleLight} title={this.state.lightsOn?'ON':'OFF'}>
			  <Icon size={theme.sizes.font * 8} color={this.state.lightsOn?'orange':theme.colors.gray2} />
			  <Text style={styles.TextStyle} color={this.state.lightsOn?"green":"red"}>{this.state.lightsOn?'ON':'OFF'}</Text>
		  </Pressable>
			<Text h2 size={42} height={80} weight={'600'} spacing={0.1}>Lights</Text>
		  </Block>
		</Block>
		<Block flex={1.25} >
		  <Block column style={{marginVertical: theme.sizes.base * 2}}>
			<Block row space="between" style={{paddingBottom:20}}>
			  <Text welcome color="black">
				RGB mode:
			  </Text>
			  <Switch disabled={!this.state.lightsOn} value={this.state.rgbMode} onValueChange={this.changeMode} />
			</Block>
			<Block row space="between">
			  <Text welcome color="black">
				Brightness
			  </Text>
			  <Text welcome color="black">
				{this.state.brightness}
			  </Text>
			</Block>
			<Slider
              disabled={this.state.rgbMode}
			  value={this.state.brightness}
			  mininumValue={0}
			  maximumValue={9}
			  step={1}
			  thumbTintColor={this.state.rgbMode? theme.colors.gray : theme.colors.accent}
			  minimumTrackTintColor={this.state.rgbMode? theme.colors.gray : theme.colors.accent}
			  maximumTrackTintColor={theme.colors.gray2}
			  onValueChange={this.updateBrightness}
			/>
			{this.state.lightsOn && this.state.rgbMode && <Block style={{paddingTop:10}}>
			  <Text welcome color="black" style={{paddingBottom: 30}}>
				Color
			  </Text>

			  <SliderHuePicker
				enabled={this.state.lightsOn}
				trackStyle={[{height: 12, width:super.width}]}
				thumbStyle={styles.thumb}
				onColorChange={this.changeColor}
				color={this.state.color}
			  />
			</Block>}

		  </Block>
		</Block>
	  </Block>
	);
  }
  static navigationOptions = {
	  /*headerLeft: ({onPress}) => (
		<TouchableWithoutFeedback onPress={() => onPress()}>
		  <FontAwesome
			size={theme.sizes.font * 1.5}
			color={theme.colors.black}
			name="arrow-left"
		  />
		</TouchableWithoutFeedback>
	  ),
	  headerLeftContainerStyle: {
		paddingLeft: theme.sizes.base * 2,
	  },*/
	  headerStyle: {
		borderBottomColor: 'transparent',
	  },
  };
}

/* above return statement (colorpicker)
return (
	  <Block flex={1} style={styles.settings}>
		<ColorPicker
		  onColorSelected={color => alert(`Color selected: ${color}`)}
		  style={{flex: 1}}
		/>
	  </Block>
	);
	*/

Lights.defaultProps = {
  settings: mocks,
};

export default Lights;

const styles = StyleSheet.create({
  settings: {
	padding: theme.sizes.base * 2,
  },
  slider: {},
 
  TextStyle:{
	fontSize: 16,
	lineHeight: 21,
	fontWeight: 'bold',
	letterSpacing: 0.25,
  },

  thumb: {
	width: 20,
	height: 20,
	borderColor: 'white',
	borderWidth: 1,
	borderRadius: 10,
	paddingTop:40,
	shadowColor: 'black',
	shadowOffset: {
		width: 0,
		height: 2
	},
	shadowRadius: 2,
	shadowOpacity: 0.35,
  },
  background: {
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	height: Dimensions.get('window').height,
  },
});
