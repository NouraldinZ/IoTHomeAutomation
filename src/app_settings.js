
export const INTERVAL = 15000;

export let app_settings = {
  backgroundFetchTask: {
    initialized: false,
    lights_initialized:false,
  },
  state: {
    // Lights Module State
    "lightsOn": true,
    "brightness": 0,
    "rgbMode": false,
    "color": { red: 255, blue: 0, green: 0 },

    // Motion Sensor Module State
    "motionDetected": false,
    "timestamp": 'defaultTimestamp',

    // Temperature & Humidity Module
    "temperature": { celcius: 22, farenheit: 73 },
    "humidity":10,
    //"date": Date,

    // Bluetooth Module
    // ...
  },
};