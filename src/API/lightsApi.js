// Used for sending http requests for controlling smart lights
import * as apiUtils from './utils';

// Toggle Lights on/off
export const toggleLights = (lights, brightness) => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/power', {//TODO: update baseUrl to flask server
        lights : lights,
        brightness: (!lights? (brightness > 0 ? brightness : 1) : 0),
        rgbMode: false,
    }).then(responseData => {
        console.log("Successfully sent request: 'toggleLights'\n", responseData);
    }).catch(err => {
        console.log("Error Occurred while sending request: 'toggleLights'\n", err);
    });
}

// Toggle RGB mode on/off
export const toggleRgbMode = (mode) => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/mode', {//TODO: update baseUrl to flask server
        rgbMode: mode,
        //brightness: mode?9:state.brightness,
    }).then(responseData => {
        console.log("Successfully sent request: 'toggleRgbMode'\n", responseData);
    }).catch(err => {
        console.log("Error Occurred while sending request: 'toggleRgbMode'\n", err);
    });
}

// Change Brightness
export const changeBrightness = (brightness) => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/brightness', { //TODO: update baseUrl to flask server
        brightness: brightness,
        lightsOn: brightness>0? true:false,
    }).then(responseData => {
        console.log("Successfully sent request: 'changeBrightness'\n", responseData);
    }).catch(err => {
        console.log("Error Occurred while sending request: 'changeBrightness'\n", err);
    });
}

// Change color
export const changeColor = (rgb) => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/color', {//TODO: update baseUrl to flask server
        color: rgb,
        brightness: 9,
    }).then(responseData => {
        console.log("Successfully sent request: 'changeColor'\n", responseData);
    }).catch(err => {
        console.log("Error Occurred while sending request: 'changeColor'\n", err);
    });
}
