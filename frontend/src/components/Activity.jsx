import React, { useState } from "react";
import SlidingButton from "./SlidingButton";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Activity = () => {
  const [lpaValue, setLpaValue] = useState(0);
  const [mvpaValue, setMvpaValue] = useState(0);

  const handleLpaPress = () => {
    // Increment the LPA value when the LPA block is pressed
    const newValue = lpaValue === 100 ? 0 : lpaValue + 10;
    setLpaValue(newValue);
  };

  const handleMvpaPress = () => {
    // Increment the MVPA value when the MVPA block is pressed
    const newValue = mvpaValue === 100 ? 0 : mvpaValue + 10;
    setMvpaValue(newValue);
  };

  return (
    <View style={styles.page}>
      {/* If user has achieved activity goal print "You have achieved your goal for today" */}
      {/* Else print "You have not achieved your goal for today" */}

      {/* TEST CODE */}
      {/* ---------------------------------------------- */}
      <Text>You have achieved your goal for today!</Text>
      {/* ---------------------------------------------- */}

      <View style={styles.middleContainer}>
        <View style={styles.leftAligned}>
          <View style={styles.lpa}>
            <View style={styles.lpaBlock}></View>
            <View style={styles.activityBar}>
              <Text style={[{ fontWeight: "bold" }]}>Target</Text>
              <View style={styles.lpaBar}></View>
            </View>
          </View>
          <Text style={[{ fontWeight: "bold" }]}>Light Physical Activity</Text>
          <Text style={[{ fontWeight: "bold" }]}>(LPA)</Text>
          <Text> </Text>
        </View>
        <View style={styles.rightAligned}>
          <View style={styles.lpa}>
            <View style={styles.mvpaBlock}></View>
            <View style={styles.activityBar}>
              <Text style={[{ fontWeight: "bold" }]}>Target</Text>
              <View style={styles.mvpaBar}></View>
            </View>
          </View>
          <Text style={[{ fontWeight: "bold" }]}>Moderate to Vigorous</Text>
          <Text style={[{ fontWeight: "bold" }]}>Physical Activity</Text>
          <Text style={[{ fontWeight: "bold" }]}>(MVPA)</Text>
        </View>
      </View>
      <Text
        style={[
          { fontWeight: "bold", marginTop: 50, fontSize: 25, marginBottom: 15 },
        ]}
      >
        Notification & Feedback Settings
      </Text>
      <View style={styles.bottomContainer}>
        <View style={styles.centerAligned}>
          <View style={styles.optionContainer}>
            <SlidingButton activeColor="#3485FF" />
            <Text style={styles.optionText}>Option 1</Text>
          </View>
          <View style={styles.optionContainer}>
            <SlidingButton activeColor="#3485FF" />
            <Text style={styles.optionText}>Option 2</Text>
          </View>
          <View style={styles.optionContainer}>
            <SlidingButton activeColor="#3485FF" />
            <Text style={styles.optionText}>Option 3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftAligned: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 35,
  },
  rightAligned: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  lpaBlock: {
    width: 125,
    height: 350,
    backgroundColor: "#89EEC4",
    marginBottom: 10,
  },
  mvpaBlock: {
    width: 125,
    height: 350,
    backgroundColor: "#89EEC4",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  optionText: {
    fontWeight: "bold",
    marginLeft: 20,
  },
  activityBar: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lpaBar: {
    height: 3, // Customize the height of the bar
    width: "100%",
    backgroundColor: "black", // Customize the color of the bar
    borderRadius: 20,
  },
  mvpaBar: {
    height: 3, // Customize the height of the bar
    width: "100%",
    backgroundColor: "black", // Customize the color of the bar
    borderRadius: 20,
  },
});

export default Activity;
