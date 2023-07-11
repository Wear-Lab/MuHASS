import socket
import asyncio
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
}

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
@app.get("/find")
async def find_devices():
    print("\n--------------------------------------------")
    print("SCANNING FOR DEVICES...")

    bluetoothData["devices"] = []
    bluetoothData["device_name"] = []

    devices = await BleakScanner.discover(timeout=5)
    for device in devices:
        if device.name == "Feather nRF52840 Sense":
            bluetoothData["devices"].append(device)
            bluetoothData["device_name"].append(device.name)

# returns list of available bluetooth devices
@app.get("/devices")
async def getDevices():
    print("\n--------------------------------------------")
    print("RETRIEVING SCANNED DEVICES LIST...")
    
    print(bluetoothData["device_name"], "\n")
    return bluetoothData["device_name"]

# establish connection with selected feather sense device
@app.get("/connect")
async def connect_device(device_index: int):
    global client

    print("\n--------------------------------------------")
    print("CONNECTING TO DEVICE...")

    if 0 <= device_index < len(bluetoothData["devices"]):

        device_info = bluetoothData["devices"][device_index]
        device_uuid = bluetoothData["device_name"][device_index]
        client = BleakClient(device_info)
        
        try:
            await client.connect()

            if client.is_connected:
                print(f"Connection to device <{device_uuid}> was successful!")
                return {"status": True}
            else:
                print(f"Connection to device <{device_uuid}> was unsuccessful!")
                return {"status": False}
            
        except Exception as e:
            print("Failed to connect: ", {e})
            return {"status": False}
    else:
        print("Invalid device index!")
        return {"status": False}
    
# disconnect feathersense device
@app.get("/disconnect")
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
    
# Function to retrieve the advertisement data of the connected device
@app.get("/services")
async def get_services():
    print("\n--------------------------------------------")
    print("GETTING SERVICES AND CHARACTERISTICS...")

    if client is not None and client.is_connected:
        try:
            await client.get_services()
            services = client.services
            service_data = []

            for service in services:
                service_uuid = service.uuid
                characteristics = service.characteristics
                print("Service UUID:", service_uuid, "\n")
                characteristic_uuids = [char.uuid for char in characteristics]
                print("Characteristic UUID:", characteristic_uuids, "\n")
                service_data.append({"service_uuid": service_uuid, "characteristics": characteristic_uuids})

            return {"service_data": service_data}

        except Exception as e:
            print("Failed to get services and characteristics:", {e})
            return {"error": str(e)}

    else:
        return {"error": "Device not connected or client is None"}

# returns the bluetooth address of the feathersense device
@app.get("/address")
async def get_address():
    print("\n--------------------------------------------")
    print("RETRIEVING DEVICE ADDRESS...")
    
    if client.is_connected:
        device_address = client.address
        print("Device address", device_address)
        return {"device_address": device_address}
    else:
        return {"error": "Device not connected or client is None"}
    
# checking if connection exists with feather sense device
@app.get("/check_connection")
async def check_connection():
    global client

    print("\n--------------------------------------------")
    print("CHECKING CONNECTION...")

    if client.is_connected:
        print("Device connected!")
        return {"status": True}
    else:
        print("Device not connected!")
        return {"status": False}

if __name__ == "__main__":
    ip_address = socket.gethostbyname(socket.gethostname())
    uvicorn.run(app, host=ip_address, port=8000)

# Successful device connections:
# Device 1 (UUID):          ['0000fe9f-0000-1000-8000-00805f9b34fb']
#          (Device Info):   Unknown
# Device 2 (UUID):          ['0000febe-0000-1000-8000-00805f9b34fb']
#          (Device Info):   7C:60:82:73:70:E4: LE-KL's Link
# Device 3 (UUID):          ['0000fea0-0000-1000-8000-00805f9b34fb']
#          (Device Info):   Unknown
# Device 4 (UUID):          ['0000fd82-0000-1000-8000-00805f9b34fb']
#          (Device Info):   Unknown
# Device 5 (UUID):          ['0000fe03-0000-1000-8000-00805f9b34fb']
#          (Device Info):   Unknown