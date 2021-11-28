import * as apiUtils from './utils';
import Toast from "react-native-root-toast";


export const makeBluetoothDiscoverable = () => {
    apiUtils.sendHttpRequest(apiUtils.requestMethods.post, apiUtils.baseUrl+'/bluetoothDisc').then(responseData => {
        console.log("Successfully sent request: 'makeBluetoothDiscoverable\n'");
        Toast.show('Discoverable Now!', {
            duration: Toast.durations.LONG,
        });
    }).catch(err => {
        console.log("Error Occurred while sending request: 'makeBluetoothDiscoverable'\n", err);
        Toast.show('Unable to execute! Check Network!', {
            duration: Toast.durations.LONG,
        });
    });
}