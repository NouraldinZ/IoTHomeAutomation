// Used for fetching state in regular intervals (every 1000ms)
import * as utils from './utils';
import * as apiUtils from "./utils";

/*
STATE JSON OBJECT
{
	// Lights Module State
	"lightsOn": boolean,
	"brightness": number,
	"rgbMode": boolean,
	"color": { red: number, blue: number, green: number }

	// Motion Sensor Module State
	"motionDetected": boolean,
	"timestamp": Date,

	// Temperature & Humidity Module
	"temperature": { celcius: number, farenheit: number },
	//"date": Date,

	// Bluetooth Module
	// ...
}
*/

export const fetchState = () => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.get, apiUtils.baseUrl+'/status').then(responseData => {
        console.log("Successfully sent request: 'fetchStatus'\nRESPONSE:\n", responseData);
    }).catch(err => {
        console.log("Error Occurred while sending request: 'fetchStatus'\n", err);
    });
}

