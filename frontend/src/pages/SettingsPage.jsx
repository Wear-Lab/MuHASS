import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import SlidingButton from "../components/SlidingButton";
import React, { useEffect, useState } from "react";
import LocalHost from "../components/data/LocalHost";

const Settings = ({ enterConnect }) => {
  const ipAddress = LocalHost.ipAddress;

  const [deviceName, setDeviceName] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("");
  const [buttonText, setButtonText] = useState("Change Device");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [dotCount, setDotCount] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    age: null,
    weight: null,
    height: null,
    duration: null,
    activity: "",
  });

  /// fetch the devices information
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const response = await fetch(`http://${ipAddress}:8000/address`);
        const data = await response.json();
        setDeviceName(data.device_address);
      } catch (error) {
        console.error("Fetch device failed:", error);
      }
    };

    fetchDeviceInfo();
  }, [ipAddress]);

  /// fetch the devices connection status
  useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const response = await fetch(
          `http://${ipAddress}:8000/check_connection`,
        );
        const data = await response.json();
        setDeviceStatus(Boolean(data.status));
      } catch (error) {
        console.error("Fetch device failed:", error);
      }
    };

    fetchDeviceStatus();
  }, [ipAddress]);

  // dot animation while attempting to disconnect to device
  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((prevDotCount) => (prevDotCount + 1) % 4);
    }, 500);

    return () => clearInterval(dotTimer);
  }, []);

  const getButtonDisplayText = () => {
    if (buttonText === "Disconnecting") {
      const dots = ".".repeat(dotCount);
      return `Disconnecting${dots}`;
    }
    return buttonText;
  };

  // exit navigation back to connect page
  const handleEnterConnect = async () => {
    if (!buttonDisabled) {
      try {
        // disable the connect button and update the text and color
        setButtonDisabled(true);
        setButtonText("Disconnecting");

        // Call the disconnect_device endpoint to disconnect from the device
        const response = await fetch(
          `http://${ipAddress}:8000/disconnect_device`,
        );
        const data = await response.json();
        const connection = data.status;

        enterConnect();
      } catch (error) {
        console.error("Disconnect device failed:", error);
      }
    }
  };

  const handleSubmit = () => {
    const { age, weight, height } = userData;

    // Close the modal
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Notification Box */}
        <View style={styles.optionBox}>
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 2,
                textAlign: "center",
              },
            ]}
          >
            Notification & Feedback Settings
          </Text>
          <View style={styles.bottomContainer}>
            <View style={styles.centerAligned}>
              <View style={styles.optionContainer}>
                <View style={styles.column}>
                  <SlidingButton activeColor="#3485FF" />
                  <SlidingButton activeColor="#3485FF" />
                  <SlidingButton activeColor="#3485FF" />
                </View>
                <View style={styles.column}>
                  <Text style={styles.optionText}>Send Sedentary Reminder</Text>
                  <Text style={styles.optionText}>Send LPA Reminder</Text>
                  <Text style={styles.optionText}>Send MVPA Reminder</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>Bluetooth Address:</Text>
          <Text style={[styles.text, { width: 220, textAlign: "center" }]}>
            {deviceName}
          </Text>
        </View>

        <View
          style={[
            styles.box,
            deviceStatus ? styles.connectedBox : styles.disconnectedBox,
          ]}
        >
          <Text style={styles.text}>Bluetooth Status:</Text>
          <Text style={[styles.text, { width: 220, textAlign: "center" }]}>
            {deviceStatus ? "Connected!" : "Disconnected!"}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.button}>
            <Text
              style={[
                {
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                },
              ]}
            >
              Edit User Data
            </Text>
          </View>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter User Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => setUserData({ ...userData, age: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (lbs)"
              onChangeText={(text) =>
                setUserData({ ...userData, weight: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Height (inches)"
              onChangeText={(text) =>
                setUserData({ ...userData, height: text })
              }
            />
            <View style={styles.buttonContainer}>
              <View
                style={[styles.modalButton, { backgroundColor: "#62C0FF" }]}
              >
                <Button title="Submit" onPress={handleSubmit} color="white" />
              </View>
              <View
                style={[styles.modalButton, { backgroundColor: "#FF4754" }]}
              >
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="white"
                />
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, buttonDisabled && { backgroundColor: "gray" }]}
          onPress={handleEnterConnect}
          disabled={buttonDisabled}
        >
          <Text style={[styles.text, { color: "white" }]}>
            {getButtonDisplayText()}
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../components/images/WEAR_Lab_Logo.png")}
          style={styles.image}
        />
        <Text>Wearable Engineering and Assistive Robotics Lab</Text>
        <Text>University of Central Florida</Text>
        <Text> </Text>
        <Text style={[{ fontWeight: "bold" }]}>MuHASS</Text>
        <Text>Multimodal Human & Ambience Sensor System</Text>
        <Text> </Text>
        <Text style={[{ fontWeight: "bold" }]}>Developed By:</Text>
        <Text>Mark Aldritz Dela Virgen</Text>
        <Text>Vi Dang</Text>
        <Text>Sean Feldman</Text>
        <Text>Seoyoung Kong</Text>
        <Text>Ho Sim</Text>
        <Text> </Text>
        <Text style={[{ fontWeight: "bold" }]}>Version 0523</Text>
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 100,
    width: screenWidth,
    backgroundColor: "F1F1F1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 60,
    width: screenWidth * 0.8,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
  },
  connectedBox: {
    backgroundColor: "#8BFF8E",
  },
  disconnectedBox: {
    backgroundColor: "#FF4754",
  },
  button: {
    width: screenWidth * 0.8,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
    backgroundColor: "#62C0FF",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    marginTop: 10,
  },

  optionBox: {
    width: screenWidth * 0.8,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  optionText: {
    fontSize: 16,
    margin: 7.5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    marginHorizontal: 40,
    width: 100,
    borderRadius: 20,
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 20,
  },
  addActivityButton: {
    width: 150,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#62C0FF",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Settings;
