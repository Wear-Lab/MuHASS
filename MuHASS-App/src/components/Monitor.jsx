import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from 'axios';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import {
  calculateENMO,
  calculateHeartRate,
  calculateSPO2,
  calculateGSR,
  determineStressLevel,
  convertTemp
} from '../../backend/MonitorCalculations';
import SampleData from '../../data/SampleData';

const Monitor = () => {
  const [dataFile, setDataFile] = useState({});
  // fetch the device data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // service and characteristic UUIDs
        const serviceCharacteristics = [
          // temperature, pressure
          {
            service_uuid: '00000200-1212-efde-1523-785feabcd123',
            characteristic_uuid: '00000201-1212-efde-1523-785feabcd123'
          },
          // humidity
          {
            service_uuid: '00000200-1212-efde-1523-785feabcd123',
            characteristic_uuid: '00000202-1212-efde-1523-785feabcd123'
          },
          // acceleration
          {
            service_uuid: '00000300-1212-efde-1523-785feabcd123',
            characteristic_uuid: '00000302-1212-efde-1523-785feabcd123'
          },
          // spo2 (ppg)
          {
            service_uuid: '00000400-1212-efde-1523-785feabcd123',
            characteristic_uuid: '00000402-1212-efde-1523-785feabcd123'
          },
          // gsr
          {
            service_uuid: '00000400-1212-efde-1523-785feabcd123',
            characteristic_uuid: '00000403-1212-efde-1523-785feabcd123'
          },
        ];

        // RUN ipconfig ON COMMAND LINE AND REPLACE LINE WITH YOUR DEVICE'S IPADDRESS
        const ipAddress = "";

        const response = await axios.post(`http://${ipAddress}:8000/data`, serviceCharacteristics);
        const data = await response.data;
        setDataFile(data);
      } catch (error) {
        console.error('Fetch data failed:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);
    
    // assign data to constants
    const environment = dataFile.environment && dataFile.environment[0]?.split(' ').map(parseFloat);
    const [c_temp, pressure] = environment || [null, null];
    const humidity = parseFloat(dataFile.humidity && dataFile.humidity[0]);
    const acceleration = dataFile.acceleration && dataFile.acceleration[0]?.split(' ').map(parseFloat);
    const [accel_x, accel_y, accel_z] = acceleration || [null, null, null];
    const gsr = parseFloat(dataFile.gsr && dataFile.gsr[0]);
    const ppg = dataFile.ppg && dataFile.ppg[0]?.split(' ').map(parseFloat);
    [ac_red, dc_red, ac_ir, dc_ir] = ppg || [null, null, null, null];
    const { hr, k } = SampleData.SampleData;

  // Functions for calculating where data lies in ranges
  const f_temp = convertTemp(c_temp);
  const heartRate = calculateHeartRate(hr);
  const gsrRate = calculateGSR(gsr);
  const oxygenRate = calculateSPO2(ac_red, dc_red, ac_ir, dc_ir, k);
  const stressLevel = determineStressLevel(heartRate.color, oxygenRate.color, gsrRate.color);
  const { enmoValue, enmoPosition } = calculateENMO(accel_x, accel_y, accel_z);

  return (
    <View style={styles.pageContainer}>
      <View style={[styles.container, {height: '6%', flexDirection: 'column'}]}>
        <View style={[{flexDirection: 'row', flex: 1}]}>
          <View style={styles.leftAlign}>
            <Text style={styles.text}>Physical Activity</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.text}>ENMO: { enmoValue.toFixed(2) }</Text>
          </View>
        </View>
        <View style={[styles.rainbowBar, {flexDirection: 'row', height: 10}]}>
          <View style={styles.redBar}></View>
          <View style={styles.orangeBar}></View>
          <View style={styles.yellowBar}></View>
          <View style={styles.greenBar}></View>
        </View>
        <FontAwesomeIcon icon={faCaretUp} style={[styles.caret, {left: enmoPosition}]}/>
      </View>
      <View style={[styles.container, {height: '60%', alignItems: 'center'}]}>
        <Text style={styles.text}>Vitals</Text>
        <View style={styles.vitalsContainer}>
          <View style={styles.bar}>
            <View style={[styles.rainbowBar, {flexDirection: 'column', height: '85%', 
                                              width: 60, marginBottom: 20}]}>
              <View style={styles.redBar}></View>
              <View style={styles.orangeBar}></View>
              <View style={styles.yellowBar}></View>
              <View style={styles.greenBar}></View>
              <View style={styles.yellowBar}></View>
              <View style={styles.orangeBar}></View>
              <View style={styles.redBar}></View>
            </View>
            <View style={[styles.blackBar, { top: heartRate.position }]}></View>
            <Text style={styles.text}>Heart Rate</Text>
            <Text style={styles.text}> { hr } bpm</Text>
          </View>
          <View style={styles.bar}>
            <View style={[styles.rainbowBar, {flexDirection: 'column', height: '85%', 
                                              width: 60, marginBottom: 20}]}>
              <View style={styles.redBar}></View>
              <View style={styles.orangeBar}></View>
              <View style={styles.yellowBar}></View>
              <View style={styles.greenBar}></View>
              <View style={styles.yellowBar}></View>
              <View style={styles.orangeBar}></View>
              <View style={styles.redBar}></View>
            </View>
            <View style={[styles.blackBar, { top: oxygenRate.position }]}></View>
            <Text style={styles.text}>SpO2</Text>
            <Text style={styles.text}> { oxygenRate.spo2.toFixed(2) } %</Text>
          </View>
          <View style={styles.bar}>
            <View style={[styles.rainbowBar, {flexDirection: 'column', height: '85%', 
                                              width: 60, marginBottom: 20}]}>
              <View style={styles.redBar}></View>
              <View style={styles.orangeBar}></View>
              <View style={styles.yellowBar}></View>
              <View style={styles.greenBar}></View>
              <View style={styles.yellowBar}></View>
              <View style={styles.orangeBar}></View>
              <View style={styles.redBar}></View>
            </View>
            <View style={[styles.blackBar, { top: gsrRate.position }]}></View>
            <Text style={styles.text}>GSR</Text>
            <Text style={styles.text}> { gsr } µS</Text>
          </View>
        </View>
      </View>
      <View style={[styles.container, {height: '15%', justifyContent: 'center'}]}>
        <View style={[styles.leftAlign, {marginLeft:20}]}>
          <Text style={styles.text}>Stress Level:</Text>
          <Text style={styles.text}>{ stressLevel.stress }</Text>
          { stressLevel.image }
        </View>
        <View style={[styles.rightAlign, {alignItems: 'center'}]}>
          <Text style={styles.text}>Environment</Text>
          <Text style={[styles.text, {fontWeight: 'normal', marginTop: 10}]}>Temperature: { f_temp.toFixed(2) } °F</Text>
          <Text style={[styles.text, {fontWeight: 'normal'}]}>Pressure: { pressure } Pa</Text>
          <Text style={[styles.text, {fontWeight: 'normal'}]}>Humidity: { humidity } %</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // basic formatting
  pageContainer: {
    marginTop: 20,
  },
  container: {
    width: 400,
    margin: 15,
  },
  leftAlign: {
    left: 10,
    position: 'absolute',
    alignItems: 'center',
  },
  rightAlign: {
    right: 10,
    position: 'absolute',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  // measurement bars
  bar: {
    alignItems: 'center',
    flex: 1, 
  },
  rainbowBar: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  vitalsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },

  // bar coloring
  greenBar: {
    flex: 1,
    backgroundColor: "#8BFF8E",
  },
  yellowBar: {
    flex: 1,
    backgroundColor: "#F3FF75",
  },
  orangeBar: {
    flex: 1,
    backgroundColor: "#FFA14D",
  },
  redBar: {
    flex: 1,
    backgroundColor: "#FF4754",
  },
  blackBar: {
    height: 5,
    backgroundColor: 'black',
    borderRadius: 15,
    width: 70,
    position: 'absolute',
  },
});

export default Monitor;