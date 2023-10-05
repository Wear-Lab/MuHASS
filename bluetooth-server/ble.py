import socket
import asyncio
from typing import Dict, List, Union
import bleak
from bleak import BleakScanner
from bleak import BleakClient
from fastapi import FastAPI, Request
import uvicorn # Server that runs FastAPI

# We want to scan for devices then connect to the MAC address or UUID 
# we specify. After that, we scan for that device's services and access 
# the characteristics of specified service(s)

# Current Issues:
# - feather sense device connection goes in and out

# Bluetooth device data
bluetoothData = {
    "devices": [],
    "device_name": [],
    "uuids": []
}

# Feather Sense UUIDs 
ENV_UUID_SERV = "00000200-1212-efde-1523-785feabcd123"
BARO_UUID_CHAR = "00000201-1212-efde-1523-785feabcd123"
HUMID_UUID_CHAR = "00000202-1212-efde-1523-785feabcd123"

MOTION_UUID_SERV = "00000300-1212-efde-1523-785feabcd123"
MAG_UUID_CHAR = "00000301-1212-efde-1523-785feabcd123"
ACCEL_UUID_CHAR = "00000302-1212-efde-1523-785feabcd123"
GYRO_UUID_CHAR = "00000303-1212-efde-1523-785feabcd123"

OTHER_UUID_SERV = "00000400-1212-efde-1523-785feabcd123"
MIC_UUID_CHAR = "00000401-1212-efde-1523-785feabcd123"
PPG_UUID_CHAR = "00000402-1212-efde-1523-785feabcd123"
GSR_UUID_CHAR = "00000403-1212-efde-1523-785feabcd123"

# create a global variable of the feathersense device
client = None

# API
app = FastAPI() 

# application scans for devices on startup
@app.on_event("startup")
async def startup_event():
    await find_devices()
    await getDevices()

# scanning available devices that contain a feathersense UUID and saving as a list
@app.get("/find_devices")
async def find_devices():
    print("\n--------------------------------------------")
    print("SCANNING FOR DEVICES...")

    bluetoothData["devices"] = []
    bluetoothData["device_name"] = []
    bluetoothData["uuids"] = []

    devices = await BleakScanner.discover(timeout=5)
    for device in devices:
        if device.name == "Feather nRF52840 Sense":
            bluetoothData["devices"].append(device)
            bluetoothData["device_name"].append(f"{device.name} ({device.address})")
            bluetoothData["uuids"].append(device.metadata)

# returns list of available bluetooth devices
@app.get("/devices")
async def getDevices(): 
    print("\n--------------------------------------------")
    print("RETRIEVING SCANNED DEVICES LIST...")
    print(bluetoothData["device_name"], "\n")
    return bluetoothData["device_name"]

# establish connection with selected feather sense device
@app.get("/connect_device")
async def connect_device(device_index: int):
    global client

    print("\n--------------------------------------------")
    print("CONNECTING TO DEVICE...")

    if 0 <= device_index < len(bluetoothData["devices"]):
        device_info = bluetoothData["devices"][device_index]
        device_uuid = bluetoothData["uuids"][device_index]
        client = BleakClient(device_info)
        
        try:
            await client.connect()

            if client.is_connected:
                print(f"Connection to device <{device_uuid}> was successful!")
                return {"status": True}
            else:
                print(f"Connection to device <{device_uuid}> was unsuccessful!")
        except Exception as e:
            print("Failed to connect: ", {e})
            return {"status": False}
    else:
        print("Invalid device index!")
        return {"status": False}
    
# disconnect feathersense device
@app.get("/disconnect_device")
async def disconnect_device():
    global client

    print("\n--------------------------------------------")
    print("DISCONNECTING FROM DEVICE...")

    if client is not None and client.is_connected:
        try:
            await client.disconnect()
            print("Disconnected from the device!")
            return {"status": True}
        
        except Exception as e:
            print("Failed to disconnect: ", {e})
            return {"status": False}
    else:
        print("No device connected!")
        return {"status": True}
    
@app.post("/data")
async def get_data(request: List[Dict[str, str]]):
    print("\n--------------------------------------------")
    print("GETTING DATA...")

    if client is not None and client.is_connected:
        try:
            data = {}

            for req in request:
                service_uuid = req.get("service_uuid")
                characteristic_uuid = req.get("characteristic_uuid")

                value = await read_data(service_uuid, characteristic_uuid)
                name = data_name(characteristic_uuid)
                if name:
                    data[name] = value

            return data

        except Exception as e:
            print("Failed to get data:", e)
            return {"error": str(e)}
    else:
        return {"error": "Device not connected or client is None"}

async def read_data(service_uuid: str, characteristic_uuid: str) -> Union[str, None]:
    try:
        # services = client.services

        # for service in services:
        for service in client.services:
            if str(service.uuid) == service_uuid:
                # characteristics = service.characteristics
                # for char in characteristics:
                for char in service.characteristics:
                    if str(char.uuid) == characteristic_uuid:
                        try:
                            value = await client.read_gatt_char(char)
                            string_value = value.decode()
                            return { string_value}
                        except Exception as e:
                            print("Failed to read data:", e)

        return None

    except Exception as e:
        print("Failed to read data:", e)
        return None
    
# assigns a name to the characteristic
def data_name(characteristic_uuid: str):
    if characteristic_uuid == "00000201-1212-efde-1523-785feabcd123":
        return "environment"
    elif characteristic_uuid == "00000202-1212-efde-1523-785feabcd123":
        return "humidity"
    elif characteristic_uuid == "00000301-1212-efde-1523-785feabcd123":
        return "magnetic"
    elif characteristic_uuid == "00000302-1212-efde-1523-785feabcd123":
        return "acceleration"
    elif characteristic_uuid == "00000303-1212-efde-1523-785feabcd123":
        return "gyroscope"
    elif characteristic_uuid == "00000401-1212-efde-1523-785feabcd123":
        return "microphone"
    elif characteristic_uuid == "00000402-1212-efde-1523-785feabcd123":
        return "ppg"
    elif characteristic_uuid == "00000403-1212-efde-1523-785feabcd123":
        return "gsr"
    else:
        return None

# returns the bluetooth address of the feathersense device
@app.get("/address")
async def get_address():
    print("\n--------------------------------------------")
    print("RETRIEVING DEVICE ADDRESS...")

    global client
    
    if client is not None and client.is_connected:
        device_address = client.address
        print("Device address", device_address)
        return {"device_address": device_address}
    else:
        return {"error": "Device not connected or client is None"}
    
# checking if connection exists with feather sense device
@app.get("/check_connection")
async def check_connection():
    print("\n--------------------------------------------")
    print("CHECKING CONNECTION...")

    global client

    if client is not None and client.is_connected:
        print("Device connected!")
        return {"status": True}
    else:
        print("Device not connected!")
        return {"status": False}
    

if __name__ == "__main__":
    ip_address = socket.gethostbyname(socket.gethostname())
    uvicorn.run(app, host=ip_address, port=8000)