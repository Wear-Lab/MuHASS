// DON"T worry about this, this will be scrapped in the future
// but is now being used more as an original file so experimental testing can happen in HomeTwo
// however HomeTwo may be the final product

import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";
import Monitor from "./Monitor";
import Feedback from "./Feedback";

const Home = () => {
  const [currCompt, setCurrCompt] = useState(null);

  const handlePress = (compt) => {
    setCurrCompt(compt);
  };

  return (
    <View style={barStyle.container}>
      <TouchableHighlight
        style={barStyle.highlight}
        onPress={() => handlePress(<Monitor />)}
      >
        <Text style={barStyle.textStyle}>My Health</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={barStyle.highlight}
        onPress={() => handlePress(<Feedback />)}
      >
        <Text style={barStyle.textStyle}>Feedback</Text>
      </TouchableHighlight>
      <View style={comptStyle.container}>{currCompt}</View>
    </View>
  );
};

const barStyle = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // marginTop: 550,
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
    left: 160,
  },

  textStyle: {
    color: "blue",
  },
});

const comptStyle = StyleSheet.create({
  container: {
    flex: 1,
    right: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 300,
  },
});

export default Home;
