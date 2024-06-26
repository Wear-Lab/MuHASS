import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BleManager } from "react-native-ble-plx";
import LocalHost from "../components/data/LocalHost";

const Connect = ({ exitConnect }) => {
  const ipAddress = LocalHost.ipAddress;

  const [devices, setDevices] = useState([]);
  const [deviceIndex, setDeviceIndex] = useState(-1);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [buttonText, setButtonText] = useState("Connect");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const manager = new BleManager();

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      if (device.name) {
        setDevices((prevDevices) => {
          if (!prevDevices.includes(device.name)) {
            return [...prevDevices, device.name];
          }
          return prevDevices;
        });
      }
    });
  }, []);

  // Hide the error container after 2 seconds
  useEffect(() => {
    const hideErrorContainer = () => {
      setConnectionStatus(false);
    };

    if (connectionStatus) {
      const timer = setTimeout(hideErrorContainer, 2000);

      return () => clearTimeout(timer);
    }
  }, [connectionStatus]);

  // dot animation while attempting to connect to device
  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((prevDotCount) => (prevDotCount + 1) % 4);
    }, 500);

    return () => clearInterval(dotTimer);
  }, []);

  const getButtonDisplayText = () => {
    if (buttonText === "Connecting") {
      const dots = ".".repeat(dotCount);
      return `Connecting${dots}`;
    }
    return buttonText;
  };

  // connect the device to app and exit to main navigation
  const handleExitConnect = async () => {
    if (deviceIndex !== -1 && !buttonDisabled) {
      try {
        // disable the connect button and update the text and color
        setButtonDisabled(true);
        setButtonText("Connecting");
        setConnectionStatus(false);

        const response = await fetch(
          `http://${ipAddress}:8000/connect_device?device_index=${deviceIndex}`,
        );
        const data = await response.json();
        const connection = data.status;

        if (connection === true) exitConnect(deviceIndex);
        else setConnectionStatus(true);
        setButtonText("Connect");
      } catch (error) {
        // device could not connect
        console.error("connect_device function error: ", error);
      } finally {
        // enable the button to be used by user again
        setButtonDisabled(false);
      }
    }
  };
  // allows developers to exit connect screen without connecting to a device
  const handleDevExit = async () => {
    exitConnect(deviceIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            position: "absolute",
            right: 10,
            top: 30,
            backgroundColor: "grey",
            height: 35,
            width: 106,
            borderRadius: 5,
          },
        ]}
        onPress={handleDevExit}
      >
        <Text style={[styles.text, { color: "white" }]}>Dev Mode</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Available Devices</Text>

      <View style={styles.box}>
        <ScrollView style={styles.deviceList}>
          {devices.map((device, index) => (
            <TouchableOpacity
              style={[
                styles.deviceContainer,
                index === deviceIndex ? styles.selectedDevice : null,
              ]}
              onPress={() => {
                setDeviceIndex(index);
              }}
              key={device.id}
            >
              <Text style={styles.devicesText}>{device}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text
        style={[
          styles.text,
          {
            textAlign: "center",
            width: "85%",
            fontWeight: "normal",
            fontSize: 13,
          },
        ]}
      >
        Ensure BLUE connection light is pulsing.
      </Text>
      <Text
        style={[
          styles.text,
          {
            textAlign: "center",
            width: "85%",
            fontWeight: "normal",
            fontSize: 13,
          },
        ]}
      >
        If not, press reset button and wait for light to pulse.
      </Text>

      <TouchableOpacity
        style={[styles.button, buttonDisabled && { backgroundColor: "gray" }]}
        onPress={handleExitConnect}
        disabled={buttonDisabled}
      >
        <Text style={[styles.text, { color: "white" }]}>
          {getButtonDisplayText()}
        </Text>
      </TouchableOpacity>

      {connectionStatus ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.text, { color: "white", textAlign: "center" }]}>
            Could not connect to device!
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  box: {
    margin: 10,
    width: "85%",
    height: "55%",
    borderColor: "#D5D5D5",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    marginTop: 20,
    width: 300,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FF4754",
    position: "absolute",
    bottom: 50,
  },
  deviceList: {
    marginTop: 5,
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 15,
  },
  deviceContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    height: 60,
    width: "94%",
    alignSelf: "center",
    margin: 5,
    padding: 2,
  },
  selectedDevice: {
    backgroundColor: "#62C0FF",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginVertical: 5,
    backgroundColor: "#62C0FF",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  devicesText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "90%",
  },
});

export default Connect;
