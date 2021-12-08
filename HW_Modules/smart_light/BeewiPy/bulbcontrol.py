from BeewiPy import BeewiSmartBulb
from subprocess import call
import time
import sys
import json

MAC_ADDRESS = "7C:EC:79:67:81:A2"       # Here you should put the MAC address of your device
try:
    myBulb = BeewiSmartBulb(MAC_ADDRESS)    # This will create a new BeewiSmartBulb object and connect to the device
    a_file = open("/home/pi/state/state.json", "r")
    json_object = json.load(a_file)
    a_file = open("/home/pi/state/state.json", "w")
    func = sys.argv[1]
    if func == "setColor":
        myBulb.turnOn() 
        myBulb.setColor(int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]))
        json_object["modules"]["smartLight"]["state"].update({"connected":True, "lightsOn":True, "color":{"red":int(sys.argv[2]), "blue":int(sys.argv[3]), "green":int(sys.argv[4])}})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4)
    elif func == "setWhite":
        myBulb.turnOn()
        myBulb.setWhite()
        json_object["modules"]["smartLight"]["state"].update({"connected": True, "lightsOn": True, "rgbMode": False})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4) 
    elif func == "turnOn":
        myBulb.turnOn()
        json_object["modules"]["smartLight"]["state"].update({"connected": True, "lightsOn": True})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4)
    elif func == "turnOff":
        myBulb.turnOff()
        json_object["modules"]["smartLight"]["state"].update({"connected": True, "lightsOn": False})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4)
    elif func == "setBrightness":
        myBulb.turnOn()
        myBulb.setBrightness(int(sys.argv[2]))
        json_object["modules"]["smartLight"]["state"].update({"connected": True, "lightsOn": True, "brightness": int(sys.argv[2])})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4) 
    elif func == "setTemperature":
        myBulb.turnOn()
        myBulb.setTemperature(int(sys.argv[2]))
        json_object["modules"]["smartLight"]["state"].update({"connected": True, "lightsOn": True, "temperature": int(sys.argv[2])})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4)
    elif func == "setColorSequence":
        myBulb.turnOn()
        myBulb.setColorSequence(int(sys.argv[2]))
        json_object["modules"]["smartLight"]["state"].update({"connected": True, "lightsOn": True, "color-sequence": int(sys.argv[2])})
        json_object["modules"]["audioSystem"]["state"].update({"connected": False})
        json.dump(json_object, a_file, indent=4)
    elif func == "increaseBrightness":
        myBulb.turnOn()
        if myBulb.getBrightness() != 9:
            myBulb.increaseBrightness()
        else:
            call(["espeak", "-s140  -ven+18 -z" , "Cannot increase brightness"])
    elif func == "decreaseBrightness":
        myBulb.turnOn()
        if myBulb.getBrightness() != 0:
            myBulb.decreaseBrightness()
        else:
            call(["espeak", "-s140  -ven+18 -z" , "Cannot decrease brightness"])
    elif func == "increaseTemperature":
        myBulb.turnOn() 
        if myBulb.getTemperature() != 9:
            myBulb.increaseTemperature()
        else:
            call(["espeak", "-s140  -ven+18 -z" , "Cannot increase temperature"])
    elif func == "decreaseTemperature":
        myBulb.turnOn() 
        if myBulb.getTemperature() != 0:
            myBulb.decreaseTemperature()
        else:
            call(["espeak", "-s140  -ven+18 -z" , "Cannot decrease temperature"])
    elif func == "getBrightness":
        brightness = myBulb.getBrightness()
        outputStr = "On a scale of 0 to 9, the brightness is at level " + str(brightness)   
        call(["espeak", "-s140  -ven+18 -z" , outputStr])   
    elif func == "getTemperature":
        temperature = myBulb.getTemperature()
        outputStr = "On a scale of 0 to 9, the temperature is at level " + str(temperature)   
        call(["espeak", "-s140  -ven+18 -z" , outputStr]) 
    a_file.close()



 


except Exception as e:
    print(e)
    print("Cannot connect to Bluetooth device")
