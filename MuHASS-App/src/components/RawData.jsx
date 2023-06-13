import { View, Text, StyleSheet } from "react-native";

const RawData = () => {
  return (
    <View>
      <Text>Raw Data</Text>

      <View style={styles.container}>

      <Text> </Text>
      <Text>Accel X: ### Y: ### Z: ###</Text>
      <Text>Gyro X: ### Y: ### Z: ###</Text>
      <Text>Mag X: ### Y: ### Z: ###</Text>
      <Text> </Text>
      <Text>Temp:</Text>
      <Text>Press:</Text>
      <Text>Humid:</Text>
      <Text> </Text>
      <Text>Light:</Text>
      <Text> </Text>
      <Text>Altitude:</Text>
      <Text> </Text>
      <Text>HR:</Text>
      <Text>Sp02:</Text>
      <Text>GSR:</Text>
      <Text></Text>
      <Text></Text>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'F1F1F1',
    justifyContent: 'center',
    alignItems: 'flex',
  }
});


export default RawData;