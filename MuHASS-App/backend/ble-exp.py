# FOR EXPERIMENTAL PURPOSES ONLY!

from bleak import BleakScanner
from bleak import BleakClient
from bleak.uuids import uuid16_dict
import asyncio


bluetoothData = {
    "devices": [],
    "device_addresses": [],
    "watch_devices": []
}

ACCEL_UUID = "00000302-1212-EFDE-1523-785FEABCD123"

async def findDevices():
    print("Scanning nearby devices..\n\n")

    devices = await BleakScanner.discover(timeout=4)
    for device in devices:
        bluetoothData["devices"].append(str(device))
        bluetoothData["device_addresses"].append(device.address)
        if device.metadata.get('uuids'):
            uuids = device.metadata['uuids']
            for uuid in uuids:
                if "-0000-1000-8000-00805f9b34fb" in str(uuid):
                    bluetoothData["watch_devices"].append(str(uuid))
                    print("YOOOOOOOOOOO", bluetoothData["watch_devices"])

    
    print("Available devices: ", bluetoothData["devices"])

def callback(chararacteristic, data):
    print("Char & data:", chararacteristic, data, "\n")

async def connectDevice(device, device_address):
    print("Connecting to device.. ", device, "\n")
    
    async with BleakClient(device_address, timeout=5) as client:
        print("Device connected! \n")
        try:
            # await client.start_notify(notify_uuid, callback)
            # await asyncio.sleep(10)
            # await client.stop_notify(notify_uuid)
            print("Device services: ", client.services)
            # accel = await client.read_gatt_char(ACCEL_UUID)
            # print(accel)


        except Exception as e:
            print("Failed.. \nException:", e)

        

        print("Device disconnected.")

async def main():
    await findDevices()
    await connectDevice(bluetoothData["devices"][0], bluetoothData["device_addresses"][0])


asyncio.run(main())