// Used for fetching state in regular intervals (every 1000ms)
import * as apiUtils from "./utils";


export const fetchState = () => {
    const result = apiUtils.sendHttpRequest(apiUtils.requestMethods.get, apiUtils.baseUrl+'/state').then(responseData => {
        console.log("Successfully sent request: 'fetchState'\n",);
        return responseData;
    }).catch(err => {
        console.log("Error Occurred while sending request: 'fetchState'\n", err);
        return false;
    });
    return result;
};



/*
STATE JSON OBJECT
GET /state
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
	"temperature": { celsius: number, farenheit: number },
	//"date": Date,

	// Bluetooth Module
	// ...
}
*/