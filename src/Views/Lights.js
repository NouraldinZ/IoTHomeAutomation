import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Slider, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../Theme/theme';
import {Block, Text, PanSlider} from '../Components';
import mocks from '../Theme/settings';
import {SliderValuePicker} from 'react-native-color-picker';

class Lights extends Component {
  static navigationOptions = {
    headerLeft: ({onPress}) => (
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
    },
    headerStyle: {
      borderBottomColor: 'transparent',
    },
  };

  state = {
    lightsOn: false,
    brightness: 1,

    // TODO: Remove
    direction: 50,
    speed: 50,
  };

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

  toggleLight(){
    console.log(!this.state.lightsOn);
    this.setState(state => ({
      lightsOn: !state.lightsOn
    }));
    // TODO: Send request to Raspberry-Pi to toggle lights switch
  }

  render() {
    const {navigation, settings} = this.props;
    const name = navigation.getParam('name');
    const Icon = settings[name].icon;

    return (
      <Block flex={1} style={styles.settings}>
        <Block flex={0.5} row>
          <Block column>
            <Icon size={theme.sizes.font * 4} color={theme.colors.gray2} />
            <Block flex={1.2} row style={{alignItems: 'flex-end'}}>
              <Text h1>22</Text>
              <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
                °C
              </Text>
            </Block>
            <Text caption>Lights</Text>
          </Block>
          <Block flex={1} center>
            <PanSlider />
          </Block>
        </Block>
        <Block flex={1} style={{paddingTop: theme.sizes.base * 2}}>
          <Block column style={{marginVertical: theme.sizes.base * 2}}>
            <Block row space="between">
              <Text welcome color="black">
                Brightness
              </Text>
              <Text welcome color="black">
                {this.state.brightness}
              </Text>
            </Block>
            <Slider
              value={0}
              mininumValue={0}
              maximumValue={9}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value =>
                this.setState({brightness: parseInt(value, 10)})
              }
            />
          </Block>
        </Block>
      </Block>
    );
  }
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
});
