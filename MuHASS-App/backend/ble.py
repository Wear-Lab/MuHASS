import asyncio
from bleak import BleakScanner
from fastapi import FastAPI
import pyfirmata
import uvicorn


# Bluetooth device data
bluetoothData = {
    "devices": []
}

# board = pyfirmata.Arduino()


# API

app = FastAPI()

# Path to user's available devices
@app.get("/")
async def getDevices():
    return bluetoothData["devices"] 

# Scanning available devices
async def findDevices():
    devices = await BleakScanner.discover(timeout=5)
    for device in devices:
        print("Device: ", device)
        bluetoothData["devices"].append(device)

@app.on_event("startup")
async def startup_eventj():
    await findDevices()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

