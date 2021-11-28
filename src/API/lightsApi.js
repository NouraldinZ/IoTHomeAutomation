// Used for sending http requests for controlling smart lights
import * as apiUtils from './utils';
import Dashboard from "../Views/Dashboard";

// Toggle Lights on/off
export function toggleLights(lights, brightness, mode, rgb) {
    const promise = apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/power', {//TODO: update baseUrl to flask server
        lights : lights,
        brightness: (!lights? (brightness > 0 ? brightness : 1) : 0),
        rgbMode: mode,
        color: rgb,
    }).then(responseData => {
        console.log("Successfully sent request: 'toggleLights'\n");
        return true;
    }).catch(err => {
        console.log("Error Occurred while sending request: 'toggleLights'\n", err);
        return false;
    });
    return promise;
}

// Toggle RGB mode on/off
export function toggleRgbMode(mode, rgb) {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/mode', {//TODO: update baseUrl to flask server
        rgbMode: mode,
        color: rgb,
        //brightness: mode?9:state.brightness,
    }).then(responseData => {
        console.log("Successfully sent request: 'toggleRgbMode'\n",);
    }).catch(err => {
        console.log("Error Occurred while sending request: 'toggleRgbMode'\n", err);
    });
}

// Change Brightness
export function changeBrightness(brightness) {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/brightness', { //TODO: update baseUrl to flask server
        brightness: brightness,
        //lightsOn: brightness>0? true:false,
    }).then(responseData => {
        console.log("Successfully sent request: 'changeBrightness'\n");
    }).catch(err => {
        console.log("Error Occurred while sending request: 'changeBrightness'\n", err);
    });
}

// Change color
export function changeColor(rgb) {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/smartLight/color', {//TODO: update baseUrl to flask server
        color: rgb,
        //brightness: 9,
    }).then(responseData => {
        console.log("Successfully sent request: 'changeColor'\n");
    }).catch(err => {
        console.log("Error Occurred while sending request: 'changeColor'\n", err);
    });
}
