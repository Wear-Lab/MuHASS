import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { calculateSPO2, convertTemp } from "../components/MonitorCalculations";
import LocalHost from "../components/data/LocalHost";
import SampleData from "../components/data/SampleData";

const RawData = () => {
  const ipAddress = LocalHost.ipAddress;

  const [dataFile, setDataFile] = useState({});

  // fetch the device data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // service and characteristic UUIDs
        const serviceCharacteristics = [
          // temperature, pressure, altitude
          {
            service_uuid: "00000200-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000201-1212-efde-1523-785feabcd123",
          },
          // humidity
          {
            service_uuid: "00000200-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000202-1212-efde-1523-785feabcd123",
          },
          // magnetic
          {
            service_uuid: "00000300-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000301-1212-efde-1523-785feabcd123",
          },
          // acceleration
          {
            service_uuid: "00000300-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000302-1212-efde-1523-785feabcd123",
          },
          // gyroscope
          {
            service_uuid: "00000300-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000303-1212-efde-1523-785feabcd123",
          },
          // microphone
          {
            service_uuid: "00000400-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000401-1212-efde-1523-785feabcd123",
          },
          // spo2 (ppg)
          {
            service_uuid: "00000400-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000402-1212-efde-1523-785feabcd123",
          },
          // gsr
          {
            service_uuid: "00000400-1212-efde-1523-785feabcd123",
            characteristic_uuid: "00000403-1212-efde-1523-785feabcd123",
          },
        ];

        const response = await axios.post(
          `http://${ipAddress}:8000/data`,
          serviceCharacteristics,
        );
        const data = await response.data;
        setDataFile(data);
      } catch (error) {
        console.error("Fetch data failed:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, [ipAddress]);

  // assign data to constants
  const environment = dataFile.environment?.[0]
    ?.split(" ")
    .map(Number.parseFloat);
  const [c_temp, pressure, altitude] = environment || [null, null, null];
  const f_temp = convertTemp(c_temp);
  const humidity = Number.parseFloat(dataFile.humidity?.[0]);
  const magnetic = dataFile.magnetic?.[0]?.split(" ").map(Number.parseFloat);
  const [mag_x, mag_y, mag_z] = magnetic || [null, null, null];
  const acceleration = dataFile.acceleration?.[0]
    ?.split(" ")
    .map(Number.parseFloat);
  const [accel_x, accel_y, accel_z] = acceleration || [null, null, null];
  const gyroscope = dataFile.gyroscope?.[0]?.split(" ").map(Number.parseFloat);
  const [gyro_x, gyro_y, gyro_z] = gyroscope || [null, null, null];
  const gsr = Number.parseFloat(dataFile.gsr?.[0]);
  const ppg = dataFile.ppg?.[0]?.split(" ").map(Number.parseFloat);
  [ac_red, dc_red, ac_ir, dc_ir] = ppg || [null, null, null, null];
  const { hr, k } = SampleData.SampleData;
  const oxygen = calculateSPO2(ac_red, dc_red, ac_ir, dc_ir, k);
  const microphone = Number.parseFloat(dataFile.gsr && dataFile.microphone[0]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Motion & Orientation</Text>

          <Text style={styles.text}>Accelerometer</Text>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Text style={styles.text}>{accel_x}</Text>
            <Text style={styles.text}>{accel_y}</Text>
            <Text style={styles.text}>{accel_z}</Text>
          </View>

          <Text style={[styles.text, { marginTop: 10 }]}>Gyroscope</Text>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Text style={styles.text}>{gyro_x}</Text>
            <Text style={styles.text}>{gyro_y}</Text>
            <Text style={styles.text}>{gyro_z}</Text>
          </View>

          <Text style={[styles.text, { marginTop: 10 }]}>Magnetometer</Text>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Text style={styles.text}>{mag_x}</Text>
            <Text style={styles.text}>{mag_y}</Text>
            <Text style={styles.text}>{mag_z}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.headerText}>Environment</Text>
          <Text style={styles.text}>Temperature: {f_temp.toFixed(2)} °F</Text>
          <Text style={styles.text}>Pressure: {pressure} Pa</Text>
          <Text style={styles.text}>Humidity: {humidity}%</Text>
          <Text style={styles.text}>Altitude: {altitude} m</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.headerText}>Physiological</Text>
          <Text style={styles.text}>HR: {hr} bpm</Text>
          <Text style={styles.text}>SpO2: {oxygen.spo2.toFixed(2)}%</Text>
          <Text style={styles.text}>GSR: {gsr} µS</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.headerText}>Additional</Text>
          <Text style={styles.text}>Microphone: {microphone} dB</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 60,
    marginBottom: 100,
    width: screenWidth,
    backgroundColor: "F1F1F1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: screenWidth * 0.8,
    margin: 10,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    padding: 15,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 2,
  },
  text: {
    fontSize: 22,
    margin: 1,
  },
});

export default RawData;
