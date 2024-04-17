import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BleManager, DeviceId, Device } from "react-native-ble-plx";

/**
 * @param {Object} props
 * @param {function} props.exitConnect
 */
const Connect = ({ exitConnect }) => {
  const bleManager = useRef(new BleManager());

  /** @type [Device[], React.Dispatch<React.SetStateAction<Device[]>>]} */
  const [devices, setDevices] = useState([]);
  const [deviceIndex, setDeviceIndex] = useState(-1);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [buttonText, setButtonText] = useState("Connect");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    bleManager.current.startDeviceScan(null, null, (error, newDevice) => {
      if (error) {
        console.error(error);
        return;
      }

      if (newDevice.name) {
        setDevices((prevDevices) => {
          if (!prevDevices.find((device) => device.name === newDevice.name)) {
            return [...prevDevices, newDevice];
          }
          return prevDevices;
        });
      }
    });
  }, [bleManager.current]);

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
  /**
   * @param {DeviceId} deviceId
   */
  const handleExitConnect = async (deviceId) => {
    if (deviceIndex !== -1 && !buttonDisabled) {
      try {
        // disable the connect button and update the text and color
        setButtonDisabled(true);
        setButtonText("Connecting");
        setConnectionStatus(false);

        const device = await bleManager.current.connectToDevice(deviceId);

        exitConnect(deviceIndex);
      } catch (error) {
        // device could not connect
        console.error("connect_device function error: ", JSON.stringify(error));
      } finally {
        // enable the button to be used by user again
        setButtonDisabled(false);
      }
    }
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
        onPress={() => router.push("/Monitor")}
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
              <Text style={styles.devicesText}>{device.name}</Text>
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
        onPress={() => handleExitConnect()}
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
