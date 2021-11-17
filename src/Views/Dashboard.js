import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {LineChart, Path} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as theme from '../Theme/theme';
import {Block, Text} from '../Components';
import mocks from '../Theme/settings';
import { LinearGradient } from 'expo-linear-gradient';

class Dashboard extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigation, settings, lights} = this.props;
    const LightIcon = settings['light'].icon;
    const ACIcon = settings['ac'].icon;
    const TempIcon = settings['temperature'].icon;
    const FanIcon = settings['fan'].icon;
    const WiFiIcon = settings['wi-fi'].icon;
    const ElectricityIcon = settings['electricity'].icon;

    return (
      <LinearGradient style={styles.background} colors={['#fcd6bd', '#72a5ff', '#408dff']} >
      <Block style={styles.dashboard}>
        <Block column style={{marginVertical: theme.sizes.base * 2}}>
          <Text size={26} bold name>Hello {this.props.navigation.state.params.username}!</Text>
        </Block>

        <Block row>
          <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
            <Text h1>22</Text>
            <Text h1 size={34} height={80} weight="600" spacing={0.1}>
              °C
            </Text>
          </Block>
          <Block flex={1} column>
            <Text name color={'grey'} size={18} >Humidity</Text>
            <LineChart
              yMax={100}
              yMin={0}
              data={[0, 20, 25, 15, 20, 55, 60]}
              style={{flex: 0.8}}
              curve={shape.curveNatural}
              svg={{stroke: theme.colors.accent, strokeWidth: 3}}
            />
          </Block>
        </Block>

        <ScrollView
          contentContainerStyle={styles.buttons}
          showsVerticalScrollIndicator={false}>
          <Block column space="between">
            <Block
              row
              space="around"
              style={{marginVertical: theme.sizes.base}}>
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

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', {name: 'ac'})}>
                <Block center middle style={styles.button}>
                  <ACIcon size={38} />
                  <Text button style={{marginTop: theme.sizes.base * 0.5}}>
                    {settings['ac'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

            <Block
              row
              space="around"
              style={{marginVertical: theme.sizes.base}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Settings', {name: 'temperature'})
                }>
                <Block center middle style={styles.button}>
                  <TempIcon size={38} />
                  <Text button style={{marginTop: theme.sizes.base * 0.5}}>
                    {settings['temperature'].name}
                  </Text>
                </Block>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.push('Settings', {name: 'fan'})}>
                <Block center middle style={styles.button}>
                  <FanIcon size={38} />
                  <Text button style={{marginTop: theme.sizes.base * 0.5}}>
                    {settings['fan'].name}
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
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height,
  },
});
