import asyncio
from bleak import BleakScanner
from bleak import BleakClient
from fastapi import FastAPI
import uvicorn

# We want to scan for devices 
# then connect to the MAC address or UUID we specify
# After that, we scan for that device's services 
# and access the characteristics of specified service(s)


# Bluetooth device data
bluetoothData = {
    "devices": [],
}

# API

app = FastAPI()


# Scanning available devices
async def findDevices():
    devices = await BleakScanner.discover(timeout=5)
    for device in devices:
        device = str(device)
        # print("Device: ", device)
        bluetoothData["devices"].append(device)


@app.on_event("startup")
async def startup_event():
    await findDevices()
    await device_connect()
    await checkDevice()


# Path to user's available devices
@app.post("/")
async def getDevices():
    return bluetoothData["devices"] 

@app.get("/")
async def device_connect():
    print("Client systems go!")
    return BleakClient(bluetoothData['devices'][0])
# BleakClient.connect()

async def checkDevice():
    if (BleakClient.is_connected):
        print("Yo we connected!")
        print(str(BleakClient.address))
        # print(BleakClient.read_gatt_char("E8496BA3-B060-EC8C-D1AD-BCCA3A6C6420"))



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

