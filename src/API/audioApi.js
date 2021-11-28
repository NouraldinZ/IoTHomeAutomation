import * as apiUtils from './utils';


export const makeBluetoothDiscoverable = () => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/bluetoothDisc').then(responseData => {
        console.log("Successfully sent request: 'makeBluetoothDiscoverable\n'");
    }).catch(err => {
        console.log("Error Occurred while sending request: 'makeBluetoothDiscoverable'\n", err);
    });
}