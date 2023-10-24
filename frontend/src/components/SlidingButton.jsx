import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const SlidingButton = ({ activeColor }) => {
  const [isOn, setIsOn] = useState(false);
  const circleAnimation = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    setIsOn(!isOn);

    Animated.timing(circleAnimation, {
      toValue: isOn ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const translateX = circleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40], // Adjust the value as per your design
  });

  return (
    <TouchableOpacity
      style={[styles.container, isOn && { backgroundColor: activeColor }]}
      onPress={handleToggle}
    >
      <View style={styles.background}>
        <Animated.View
          style={[styles.circle, { transform: [{ translateX }] }]}
        />
      </View>
      <Text style={[styles.text, isOn && { color: "white" }]}>
        {isOn ? "ON" : "OFF"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 20, // Half of the height
  },
  background: {
    width: 50, // Adjust the value as per your design
    height: 40, // Adjust the value as per your design
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  circle: {
    width: 25, // Adjust the value as per your design
    height: 25, // Adjust the value as per your design
    borderRadius: 16, // Half of the height
    backgroundColor: "white", // Adjust the color as per your design
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default SlidingButton;
