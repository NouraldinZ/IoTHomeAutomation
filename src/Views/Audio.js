// export default Audio;
import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../Theme/theme';
import {Block, Text} from '../Components';
import * as audioApi from '../API/audioApi';

function onPressFunction(){
    audioApi.makeBluetoothDiscoverable();
}

class Audio extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Block center style={styles.container2}>
                    <FontAwesome name="bluetooth-b" size={theme.sizes.font * 8} color="#D0CAB2"/>
                </Block>
                <Text style={styles.text1} center h2 size={42} height={80} weight={'600'} spacing={0.1} color= '#D0CAB2'>Audio</Text>
                <Text style={styles.text2} h3 height={30} weight={'600'}>1. Turn on bluetooth</Text>
                <Text style={styles.text2} h3 height={30} weight={'600'}>2. Connect to Raspberry Pi</Text>
                <Pressable style={styles.press} center onPress={onPressFunction} backgroundColor="#D0CAB2" alignSelf= 'flex-start'>
                    <Text h3 size={25} color="white">Make discoverable</Text>
                </Pressable>

            </View>
        )
    }
}
export default Audio;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#89B5AF',
    },
    container2: {
        paddingTop: 100,
      },
    text1: {
        color: '#D0CAB2',
        marginLeft: 0,
        marginRight: 0
        
    },
    text2: {
        color: '#D0CAB2',
        fontSize: 25,
        marginLeft: 50,
        marginTop: 10,
    },
    press: {
        marginTop:50,
        paddingTop:15,
        paddingBottom:15,
        paddingHorizontal:25,
        alignItems:"center",
        alignSelf:"center",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        borderRadius: 8
    }   
  });