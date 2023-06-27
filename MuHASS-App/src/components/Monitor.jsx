import { View, Text, StyleSheet} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import SampleData from '../../data/SampleData';
import SampleData1 from '../../data/SampleData1';
import {
  calculateENMO,
  calculateHeartRate,
  calculateSPO2,
  calculateGSR,
  determineStressLevel
} from '../../backend/MonitorCalculations';

const Monitor = () => {
  // THE FOLLOWING LINES ARE USED FOR TESTING!!! Feel free to modify the json files to your liking :)
  // ---------------------------------------------------------------------------------------------- //
  const { magnetic_x, magnetic_y, magnetic_z, acceleration_x, acceleration_y, acceleration_z, 
          gyro_x, gyro_y, gyro_z, temperature, pressure, humidity, gsr_average, hr, spo2 } = SampleData.SampleData;
  // const { magnetic_x, magnetic_y, magnetic_z, acceleration_x, acceleration_y, acceleration_z, 
  //         gyro_x, gyro_y, gyro_z, temperature, pressure, humidity, gsr_average, hr, spo2 } = SampleData1.SampleData1;
  // ---------------------------------------------------------------------------------------------- //

  // Functions for calculating data
  const { enmoValue, enmoPosition } = calculateENMO(magnetic_x, magnetic_y, magnetic_z, 
          acceleration_x, acceleration_y, acceleration_z, gyro_x, gyro_y, gyro_z, 
          temperature, pressure, humidity, gsr_average, hr, spo2);
  const heartRate = calculateHeartRate(hr);
  const oxygenRate = calculateSPO2(spo2);
  const gsrRate = calculateGSR(gsr_average);
  const stressLevel = determineStressLevel(heartRate.color, oxygenRate.color, gsrRate.color);

  return (
    <View style={styles.pageContainer}>
      <View style={[styles.container, {height: '7%', flexDirection: 'column'}]}>
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
            <Text style={styles.text}> { spo2 } %</Text>
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
            <Text style={styles.text}> { gsr_average } µS</Text>
          </View>
        </View>
      </View>
      <View style={[styles.container, {height: '20%', justifyContent: 'center'}]}>
        <View style={[styles.leftAlign]}>
          <Text style={styles.text}>Stress Level: { stressLevel.stress }</Text>
          { stressLevel.image }
        </View>
        <View style={[styles.rightAlign, {alignItems: 'center'}]}>
          <Text style={styles.text}>Environment</Text>
          <Text style={[styles.text, {fontWeight: 'normal'}]}>Temperature: { temperature } F</Text>
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
    marginTop: 50,
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