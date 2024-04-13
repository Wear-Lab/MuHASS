import { Slot, router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const navItems = [
  { pathname: "Monitor", image: require("../components/images/monitor.png") },
  { pathname: "Activity", image: require("../components/images/activity.png") },
  { pathname: "RawData", image: require("../components/images/rawdata.png") },
  { pathname: "Settings", image: require("../components/images/settings.png") },
];

export default function Layout() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Slot />
      </View>

      {/* Searches and assigns image for each navigation icon */}
      {pathname !== "/" && (
        <View style={styles.navContainer}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.pathname}
              style={[
                styles.navItem,
                pathname === `/${item.pathname}` && styles.activeNavItem,
              ]}
              onPress={() => router.push(item.pathname)}
            >
              <Image source={item.image} style={styles.navItemImage} />
              <Text style={styles.navItemText}>{item.pathname}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

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
