import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const About = ({ enterConnect }) => {
  const handleEnterConnect = () => {
    enterConnect();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleEnterConnect}>
        <Text style={styles.text}>Change Device</Text>
      </TouchableOpacity>
      <Image source={require('./images/WEAR_Lab_Logo.png')} style={styles.image} />
      <Text style={[{fontWeight: "bold" }]}>Multimodal Human & Ambience</Text>
      <Text style={[{fontWeight: "bold" }]}>Sensor System</Text>
      <Text>Wearable Engineering and Assistive Robotics Lab</Text>
      <Text>University of Central Florida</Text>
      <Text> </Text>
      <Text style={[{fontSize: 16 }]}>Version 0523</Text>
      <Text> </Text>
      <Text> </Text>
      <Text style={[{fontWeight: "bold"}]}>Developed By:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'F1F1F1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#8BFF8E",
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    marginTop: 50,
    marginBottom: 10,
  }
});

export default About;
