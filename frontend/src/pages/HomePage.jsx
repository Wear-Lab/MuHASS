import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Activity from "./ActivityPage";
import Connect from "./ConnectPage";
import Monitor from "./MonitorPage";
import RawData from "./RawDataPage";
import Settings from "./SettingsPage";

// Define an array of objects representing each navigation image
const navItems = [
  { name: "Monitoring", image: require("../components/images/monitor.png") },
  { name: "Activity", image: require("../components/images/activity.png") },
  { name: "Raw Data", image: require("../components/images/rawdata.png") },
  { name: "Settings", image: require("../components/images/settings.png") },
];

// This const is responsible for outputting the navigation bar to the screen
const HomePage = () => {
  // Change this line later is we want to select the device page before
  // using other app pages
  const [activeTab, setActiveTab] = useState(null);
  const [deviceIndex, setDeviceIndex] = useState(null);

  // Allows us to switch between components on the navbar
  const handlePress = (tabName) => {
    setActiveTab(tabName);
  };

  // Inside Home component
  const handleExitConnect = (deviceIndex) => {
    setActiveTab("Monitoring");
    setDeviceIndex(deviceIndex);
  };

  // Inside Home component
  const handleEnterConnect = () => {
    setActiveTab("Connect");
  };

  return (
    <View style={styles.container}>
      {/* Render the Connect component if no activeTab is set */}
      {activeTab === null || activeTab === "Connect" ? (
        <Connect
          exitConnect={handleExitConnect}
          enterConnect={handleEnterConnect}
        />
      ) : (
        <View style={styles.contentContainer}>
          {activeTab === "Monitoring" && <Monitor />}
          {activeTab === "Activity" && <Activity />}
          {activeTab === "Raw Data" && <RawData />}
          {activeTab === "Settings" && (
            <Settings enterConnect={handleEnterConnect} />
          )}
          {activeTab === "Connect" && (
            <Connect exitConnect={handleExitConnect} />
          )}
        </View>
      )}

      {/* Searches and assigns image for each navigation icon */}
      {activeTab !== null && activeTab !== "Connect" && (
        <View style={styles.navContainer}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.navItem,
                activeTab === item.name && styles.activeNavItem,
              ]}
              onPress={() => handlePress(item.name)}
            >
              <Image source={item.image} style={styles.navItemImage} />
              <Text style={styles.navItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Styles used for navigation bar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    height: "7%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navItemImage: {
    width: 24,
    height: 24,
  },
  navItemText: {
    color: "black",
    fontSize: 10,
  },
  activeNavItem: {
    backgroundColor: "#74D2FA",
  },
});

export default HomePage;
