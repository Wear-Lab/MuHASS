import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import SampleData from '../../data/SampleData';
import SampleData1 from '../../data/SampleData1';

const RawData = () => {
  
  // THE FOLLOWING LINES ARE USED FOR TESTING!!! Feel free to modify the json files to your liking :)
  // ---------------------------------------------------------------------------------------------- //
  const { magnetic_x, magnetic_y, magnetic_z, acceleration_x, acceleration_y, acceleration_z, 
          gyro_x, gyro_y, gyro_z, temperature, pressure, altitude, humidity, mic, gsr_average, 
          hr, spo2, light} = SampleData.SampleData;
  // const { magnetic_x, magnetic_y, magnetic_z, acceleration_x, acceleration_y, acceleration_z, 
  //         gyro_x, gyro_y, gyro_z, temperature, pressure, altitude, humidity, mic, gsr_average, 
  //         hr, spo2, light} = SampleData1.SampleData1;
  // ---------------------------------------------------------------------------------------------- //

  return (
    <View style={styles.pageContainer}>

      <View style={styles.container}>
        <Text style={styles.headerText}>Motion & Orientation</Text>
        <Text style={styles.text}>Accelerometer</Text>
        <Text style={styles.text}>X: { acceleration_x } || Y: { acceleration_y } || Z : { acceleration_z }</Text>
        <Text style={[styles.text, {marginTop: 10}]}>Gyroscope</Text>
        <Text style={styles.text}>X: { gyro_x } || Y: { gyro_y } || Z : { gyro_z }</Text>
        <Text style={[styles.text, {marginTop: 10}]}>Magnetometer</Text>
        <Text style={styles.text}>X: { magnetic_x } || Y: { magnetic_y } || Z : { magnetic_z }</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerText}>Environment</Text>
        <Text style={styles.text}>Temperature: { temperature } F</Text>
        <Text style={styles.text}>Pressure: { pressure } Pa</Text>
        <Text style={styles.text}>Humidity: { humidity } %</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerText}>Physiological</Text>
        <Text style={styles.text}>HR: { hr } bpm</Text>
        <Text style={styles.text}>SpO2: { spo2 } %</Text>
        <Text style={styles.text}>GSR: { gsr_average } µS</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerText}>Additional</Text>
        <Text style={styles.text}>Light: { light } </Text>
        <Text style={styles.text}>Altitude: { altitude }</Text>
      </View>

  </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    width: 375,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    padding: 15,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 2,
  },
  text: {
    fontSize: 22,
    margin: 1,
  },
});


export default RawData;