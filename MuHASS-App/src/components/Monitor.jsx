import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Monitor = () => {
  return (
    <View>
      <Text style={container.title}>Health monitoring</Text>
      <Text style={container.subtext}>Physical Activity</Text>
      <Text style={container.subtext2}>ENMO: #.##</Text>
      <Text style={container.subtext3}>Vitals</Text>
      <View style={vitalsSpectrum.redBar}></View>
      <View style={vitalsSpectrum.orangeBar}></View>
      <View style={vitalsSpectrum.yellowBar}></View>
      <View style={vitalsSpectrum.greenBar}></View>
      <View style={vitalsSpectrum.redBar2}></View>
      <View style={vitalsSpectrum.orangeBar2}></View>
      <View style={vitalsSpectrum.yellowBar2}></View>
      <View style={vitalsSpectrum.greenBar2}></View>
      <View style={vitalsSpectrum.redBar3}></View>
      <View style={vitalsSpectrum.orangeBar3}></View>
      <View style={vitalsSpectrum.yellowBar3}></View>
      <View style={vitalsSpectrum.greenBar3}></View>
      <Text style={container.heartRate}>Heart Rate</Text>
      <Text style={container.spo2}>SpO2</Text>
      <Text style={container.gsr}>GSR</Text>
      <FontAwesomeIcon
        icon={faCaretUp}
        style={physicalActivitySpectrum.caret}
      />
      <View style={physicalActivitySpectrum.redBar}></View>
      <View style={physicalActivitySpectrum.orangeBar}></View>
      <View style={physicalActivitySpectrum.yellowBar}></View>
      <View style={physicalActivitySpectrum.greenBar}></View>
    </View>
  );
};

const container = StyleSheet.create({
  title: {
    position: "absolute",
    bottom: 450,
    right: -25,
  },
  subtext: {
    position: "absolute",
    bottom: 370,
    right: 140,
  },
  subtext2: {
    position: "absolute",
    bottom: 370,
    left: 130,
  },
  subtext3: {
    position: "absolute",
    bottom: 300,
    right: 205,
  },

  heartRate: {
    position: "relative",
    top: 150,
    right: 140,
  },
  spo2: {
    position: "relative",
    top: 135,
    right: -10,
  },
  gsr: {
    position: "relative",
    top: 120,
    right: -150,
  },
});

const physicalActivitySpectrum = StyleSheet.create({
  redBar: {
    width: 105,
    height: 10,
    backgroundColor: "red",
    position: "absolute",
    bottom: 350,
    right: 140,
  },
  orangeBar: {
    width: 105,
    height: 10,
    backgroundColor: "orange",
    position: "absolute",
    bottom: 350,
    right: 40,
  },
  yellowBar: {
    width: 105,
    height: 10,
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 350,
    left: 30,
  },
  greenBar: {
    width: 105,
    height: 10,
    backgroundColor: "#32CD32",
    position: "absolute",
    bottom: 350,
    left: 130,
  },
  caret: {
    color: "#091120",
    position: "absolute",
    bottom: 333,
  },
});

const vitalsSpectrum = StyleSheet.create({
  redBar: {
    width: 10,
    height: 80,
    backgroundColor: "red",
    position: "absolute",
    bottom: 190,
    right: 180,
  },
  orangeBar: {
    width: 10,
    height: 80,
    backgroundColor: "orange",
    position: "absolute",
    bottom: 110,
    right: 180,
  },
  yellowBar: {
    width: 10,
    height: 80,
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 30,
    right: 180,
  },
  greenBar: {
    width: 10,
    height: 80,
    backgroundColor: "#32CD32",
    position: "absolute",
    bottom: -50,
    right: 180,
  },
  redBar2: {
    width: 10,
    height: 80,
    backgroundColor: "red",
    position: "absolute",
    bottom: 190,
    right: 40,
  },
  orangeBar2: {
    width: 10,
    height: 80,
    backgroundColor: "orange",
    position: "absolute",
    bottom: 110,
    right: 40,
  },
  yellowBar2: {
    width: 10,
    height: 80,
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 30,
    right: 40,
  },
  greenBar2: {
    width: 10,
    height: 80,
    backgroundColor: "#32CD32",
    position: "absolute",
    bottom: -50,
    right: 40,
  },
  redBar3: {
    width: 10,
    height: 80,
    backgroundColor: "red",
    position: "absolute",
    bottom: 190,
    right: -95,
  },
  orangeBar3: {
    width: 10,
    height: 80,
    backgroundColor: "orange",
    position: "absolute",
    bottom: 110,
    right: -95,
  },
  yellowBar3: {
    width: 10,
    height: 80,
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 30,
    right: -95,
  },
  greenBar3: {
    width: 10,
    height: 80,
    backgroundColor: "#32CD32",
    position: "absolute",
    bottom: -50,
    right: -95,
  },
});

export default Monitor;
