// export default Audio;
import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../Theme/theme';
import {Block, Text} from '../Components';

function onPressFunction(){
    console.log("Button Pressed")
}

class Audio extends Component {
    render() {
        return(
            <View style={styles.container}>
            <Block style ={styles.container2}>
            <FontAwesome name="bluetooth-b" size={theme.sizes.font * 8} color="#D0CAB2"/>
            </Block>
            <Text style={styles.text1} h2 size={42} height={80} weight={'600'} spacing={0.1} color= '#D0CAB2'>Audio</Text>
            <Text style={styles.text2} h3 height={30} weight={'600'}>1. Turn on bluetooth</Text>
            <Text style={styles.text3} h3 height={30} weight={'600'}>2. Connect to Raspberry Pi</Text>
            <Pressable style={styles.press} onPress={onPressFunction} backgroundColor="#D0CAB2" alignSelf= 'flex-start'>
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
        marginLeft: 150,
        marginRight: 50,       
      },
    text1: {
        color: '#D0CAB2',
        marginLeft: 125,
        marginRight: 0
        
    },
    text2: {
        color: '#D0CAB2',
        fontSize: 25,
        paddingLeft: 60,
        paddingRight: 50      
    },
    text3: {
        color: '#D0CAB2',
        fontSize: 25,
        paddingLeft: 30    
    },
    press: {
        marginTop: 20,
        marginLeft: 70,
        marginRight: 60,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        borderRadius: 8
    }   
  });