import React, {Component, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Slider} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../Theme/theme';
import {Block, Text, PanSlider} from '../Components';
import mocks from '../Theme/settings';
import {ColorPicker} from 'react-native-color-picker';

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
    direction: 45,
    speed: 12,
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

  render() {
    const {navigation, settings} = this.props;
    const name = navigation.getParam('name');
    const Icon = settings[name].icon;

    return (
      <Block
        flex={1}
        style={{
          padding: theme.sizes.base * 2,
        }}>
        <ColorPicker
          onColorSelected={color => alert(`Color selected: ${color}`)}
          style={{flex: 1}}
        />
      </Block>
    );
  }
}

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

const [backgroundColor, setBackgroundColor] = useState('#e3aa7f');
