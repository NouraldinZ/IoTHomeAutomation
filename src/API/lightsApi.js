// Used for sending http requests for controlling smart lights
import * as apiUtils from './utils';

// Toggle Lights on/off
const toggleLights = (lights, brightness) => {
    sendHttpRequest(requestMethods.post(), baseUrl+'', {//TODO: update to real flask endpoint url
        lights : lights,
        brightness: (!lights? (brightness > 0 ? brightness : 1) : 0),
        rgbMode: false,
    }).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    });
}

// Toggle RGB mode on/off
const toggleRgbMode = (mode) => {
    sendHttpRequest(requestMethods.post(), baseUrl+'', {//TODO: update to real flask endpoint url
        rgbMode: mode,
        brightness: mode?9:state.brightness,
    }).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    });
}

// Change Brightness
const changeBrightness = (brightness) => {
    sendHttpRequest(requestMethods.post(), baseUrl+'', { //TODO: update to real flask endpoint url
        brightness: brightness,
        lightsOn: brightness>0? true:false,
    }).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    });
}

// Change color
const changeColor = (rgb) => {
    sendHttpRequest(requestMethods.post(), baseUrl+'', {//TODO: update to real flask endpoint url
        color: rgb,
        brightness: 9,
    }).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    });
}
