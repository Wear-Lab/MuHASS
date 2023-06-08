import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Monitor from "./Monitor";
import Activity from "./Activity";
import RawData from "./RawData";
import About from "./About";

// Define an array of objects representing each navigation image
const navItems = [
  { name: "Monitoring", image: require("./images/monitor.png") },
  { name: "Activity", image: require("./images/activity.png") },
  { name: "Raw Data", image: require("./images/rawdata.png") },
  { name: "About", image: require("./images/about.png") },
];

// This const is responsible for outputting the navigation bar to the screen
const HomeTwo = () => {
  // Change this line later is we want to select the device page before
  // using other app pages
  const [activeTab, setActiveTab] = useState(null);

  // Allows us to switch between components on the navbar
  const handlePress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Render the current active component based on activeTab */}
        {activeTab === "Monitoring" && <Monitor />}
        {activeTab === "Activity" && <Activity />}
        {activeTab === "Raw Data" && <RawData />}
        {activeTab === "About" && <About />}
      </View>

      {/* Searches and assigns image for each navigation icon */}
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
    </View>
  );
};

// Styles used for navigation bar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navContainer: {
    flexDirection: "row",
    backgroundColor: 'white',
    height: 65,
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
    backgroundColor: "lightblue",
  },
});

export default HomeTwo;
