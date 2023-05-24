import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";
import Monitor from "./Monitor";
import Activity from "./Activity";
import RawData from "./RawData";
import About from "./About";

const HomeTwo = () => {
  const [compt, setCompt] = useState(null);

  // Allows us to switch between components on the navbar
  const handlePress = (compt) => {
    setCompt(compt);
  };

  // The navbar itself uses touchable highlights which is just fancy for buttons
  // When clicked, it will trigger a function that switches the screen/component we're on
  return (
    <View style={barStyle.container}>
      <TouchableHighlight
        style={barStyle.highlight}
        onPress={() => handlePress(<Monitor />)}
      >
        <Text style={barStyle.textStyle}>Monitoring</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={barStyle.highlight}
        onPress={() => handlePress(<Activity />)}
      >
        <Text style={barStyle.textStyle}>Activity</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={barStyle.highlight}
        onPress={() => handlePress(<RawData />)}
      >
        <Text style={barStyle.textStyle}>Raw Data</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={barStyle.highlight}
        onPress={() => handlePress(<About />)}
      >
        <Text style={barStyle.textStyle}>About</Text>
      </TouchableHighlight>
      <View style={comptStyle.container}>{compt}</View>
    </View>
  );
};

const barStyle = StyleSheet.create({
  container: {
    flex: 1,
    top: 350,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  highlight: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    position: "relative",
    left: 70,
  },

  textStyle: {
    color: "blue",
  },
});

const comptStyle = StyleSheet.create({
  container: {
    flex: 1,
    right: 145,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 300,
  },
});

export default HomeTwo;
