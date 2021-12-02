from flask import Flask
import json
from flask import request
import subprocess
import os
import sys
sys.path.insert(1, '../../smart_light/BeewiPy')
sys.path.insert(2, '../../')
sys.path.insert(3, '../../motion_detection')
from BeewiPy import BeewiSmartBulb
import time
fileDirectory = os.path.dirname(os.path.realpath(__file__))

# Smart-light module API requests#

MAC_ADDRESS = "7C:EC:79:67:81:A2"
try:
     myBulb = BeewiSmartBulb(MAC_ADDRESS)
except Exception as e:
    print("cannot connect to smart lights")

subprocess.Popen(['python3','/home/pi/tempModule.py'])
subprocess.Popen(['python3','/home/pi/motion_detection/pircontrol.py'])

app = Flask(__name__)
@app.route('/smartLight/power',methods=['POST'])

def toggleLights():
    request_data = request.get_json()
    if(request_data['lights']==False):
        try:
            myBulb.turnOff()
        except Exception as e:
            print(e)
            print("Cannot connect to Bluetooth device")
    elif(request_data['lights']==True):
        try:
            myBulb.turnOn()
        except Exception as e:
            print(e)
            print("Cannot connect to Bluetooth device")
    print(request_data)
    return " "

@app.route('/smartLight/brightness',methods=['POST'])
def changeBrightness():
    request_data = request.get_json()
    myBulb.setBrightness(request_data['brightness'])
    print(request_data)
    return " "

@app.route('/smartLight/mode',methods=['POST'])
def toggleRgbMode():
    request_data = request.get_json()
    if(request_data['rgbMode']==True):
        myBulb.setColor(request_data['color']['red'],request_data['color']['green'],request_data['color']['blue'])
    elif(request_data['rgbMode']==False):
        myBulb.setWhite()
    print(request_data)
    return " "

@app.route('/smartLight/color',methods=['POST'])
def changeColor():
    request_data = request.get_json()
    myBulb.setColor(request_data['color']['red'],request_data['color']['green'],request_data['color']['blue'])
    print(request_data)
    return " "

@app.route('/bluetoothDisc',methods=['POST'])
def makeDiscoverable():
    subprocess.call(["/bin/bash",fileDirectory+"/pair_device.sh"])
    return " "

# State API request #

@app.route('/state',methods=['GET'])
def fetchState():
    with open('/home/pi/state/state.json') as f:
       data = json.load(f)
    #print(data)
    settings = myBulb.getSettings()
    state =  {"lightsOn":True if settings[0]==1 else False,"brightness":(((settings[1] & 0xF0) >> 4) - 2) ,"rgbMode":(0x0 <= (settings[1] & 0x0F) < 0x2) ,"color": { "red": settings[2], "blue": settings[3], "green": settings[4]}, "motionDetected": data['modules']['motion'$
    state_json  = json.dumps(state)
    print(state_json)
    return state_json

if __name__ == '__main__':
    app.run( port=80, host='0.0.0.0')

