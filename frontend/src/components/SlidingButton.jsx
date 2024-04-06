import React, { useState, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

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
    outputRange: [0, 20], // Adjust the value as per your design
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50, // Adjust the width as per your design
    height: 25, // Adjust the height as per your design
    borderRadius: 20, // Half of the height
    backgroundColor: "#ddd",
    margin: 5,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  circle: {
    width: 15, // Adjust the value as per your design
    height: 15, // Adjust the value as per your design
    borderRadius: 16, // Half of the height
    backgroundColor: "white", // Adjust the color as per your design
  },
});

export default SlidingButton;
