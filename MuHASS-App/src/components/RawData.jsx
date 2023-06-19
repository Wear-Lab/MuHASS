import { View, Text } from "react-native";

const RawData = () => {
  // these variables will all be set to random values for now
  let accX = 2;
  let accY = 3;
  let accZ = 4;

  let gyroX = 5;
  let gyroY = 6;
  let gyroZ = 7;

  let magX = 7.7;
  let magY = 7.8;
  let magZ = 7.9;

  let temperature = 8;
  let pressure = 9;
  let humid = 10;

  let light = 11;
  let altitude = 12;

  let heartRate = 13;
  let spo2 = 14;
  let gsr = 15;

  return (
    <View>
      <Text>Raw Data</Text>
      <Text>
        Accel X: {accX} Y: {accY} Z: {accZ}
      </Text>
      <Text>
        Gyro X: {gyroX} Y: {gyroY} Z: {gyroZ}
      </Text>
      <Text>
        Mag X: {magX} Y: {magY} Z: {magZ}
      </Text>
      <Text></Text>
      <Text></Text>
      <Text>Temp: {temperature}</Text>
      <Text>Press: {pressure}</Text>
      <Text>Humid: {humid}</Text>
      <Text></Text>
      <Text></Text>
      <Text>Light {light}</Text>
      <Text></Text>
      <Text></Text>
      <Text>Altitude: {altitude}</Text>
      <Text></Text>
      <Text></Text>
      <Text>HR: {heartRate}</Text>
      <Text>SpO2: {spo2}</Text>
      <Text>GSR: {gsr}</Text>
    </View>
  );
};

export default RawData;
