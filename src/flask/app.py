from flask import Flask
import json
from flask import request

import sys
sys.path.insert(1, '../../smart_light/BeewiPy')
from BeewiPy import BeewiSmartBulb
import time


MAC_ADDRESS = "7C:EC:79:67:81:A2"
myBulb = BeewiSmartBulb(MAC_ADDRESS)

app = Flask(__name__)
@app.route('/smartLight/power',methods=['POST'])

def toggleLights():
    request_data = request.get_json()
    if(request_data['lights']==True):
        try:
            myBulb.turnOn()
        except Exception as e:
            print(e)
            print("Cannot connect to Bluetooth device")

    print(request_data)
    return " "

@app.route('/smartLight/brightness',methods=['POST'])