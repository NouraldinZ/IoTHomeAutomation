from BeewiPy import BeewiSmartBulb
import time

MAC_ADDRESS = "7C:EC:79:67:81:A2"       # Here you should put the MAC address of your device
try:
    myBulb = BeewiSmartBulb(MAC_ADDRESS)    # This will create a new BeewiSmartBulb object and connect to the device
    myBulb.turnOn()                         # This will turn on your bulb
    myBulb.setWhite()
    time.sleep(5)                           # This will wait 5 seconds
    myBulb.setColorSequence(1)
    time.sleep(5)
    myBulb.getHWInfo()
    myBulb.turnOff()
except Exception as e:
    print(e)
    print("Cannot connect to Bluetooth device")
