#!/usr/bin/env python
 
import sys
import time
import RPi.GPIO as io
import subprocess
import json
 
io.setmode(io.BCM)
PIR_PIN = 17        # Pin 11 on the board
LED_PIN = 27        # Pin 13 on the board 

def main():
    io.setup(PIR_PIN, io.IN)
    io.setup(LED_PIN, io.OUT)
    turned_off = False
    last_motion_time = time.time()
    cnvrtd_last_motion_time = ""
    
    while True:
        if io.input(PIR_PIN):
            last_motion_time = time.time()
            io.output(LED_PIN, io.HIGH)
            if turned_off:
                a_file = open("/home/pi/state/state.json", "r")
                json_object = json.load(a_file)
                a_file = open("/home/pi/state/state.json", "w")
                turned_off = False
                cnvrtd_last_motion_time = time.asctime(time.localtime(last_motion_time))
                json_object["modules"]["motion"]["state"].update({"motionDetected": True, "timestamp": cnvrtd_last_motion_time})
                json.dump(json_object, a_file, indent=4)
                a_file.close()
                print(cnvrtd_last_motion_time)
        else:
            if not turned_off and time.time() > (last_motion_time):
                a_file = open("/home/pi/state/state.json", "r")
                json_object = json.load(a_file)
                a_file = open("/home/pi/state/state.json", "w")
                turned_off = True
                io.output(LED_PIN, io.LOW)
                json_object["modules"]["motion"]["state"].update({"motionDetected": False, "timestamp": "N/A"})
                json.dump(json_object, a_file, indent=4)
                a_file.close()
        time.sleep(.1)
 
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        io.cleanup()
