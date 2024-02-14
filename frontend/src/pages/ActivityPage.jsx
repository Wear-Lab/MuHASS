import React, { useEffect, useState } from 'react';
import {  
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Button, 
  ScrollView,
  Dimensions } from "react-native";
import { 
  calculateSB,
  calculateLPA,
  calculateMVPA,
} from '../components/ActivityCalculations';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import LocalHost from '../components/data/LocalHost';
import SampleData from '../components/data/SampleData';

const Activity = () => {
  const ipAddress = LocalHost.ipAddress;
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    age: null,
    weight: null,
    height: null,
    duration: null,
    activity: "",
  });
  const [dataFile, setDataFile] = useState({});

  // const handleSubmit = () => {
  //   const { age, weight, height, duration, activity } = userData;
    
  //   // Close the modal
  //   setModalVisible(false);
  // };

  // fetch the device data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // service and characteristic UUIDs
        const serviceCharacteristics = [
          // acceleration
          {
            service_uuid: '00000300-1212-efde-1523-785feabcd123',
            characteristic_uuid: '00000302-1212-efde-1523-785feabcd123'
          },
        ];

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

  const acceleration = dataFile.acceleration && dataFile.acceleration[0]?.split(' ').map(parseFloat);
  const [accel_x, accel_y, accel_z] = acceleration || [null, null, null];
  const { age } = SampleData.SampleData;

  // Perform any necessary calculations or operations with the user data
  const sb = calculateSB(accel_x, accel_y, accel_z, age, screenHeight * .6);
  const lpa = calculateLPA(accel_x, accel_y, accel_z, age, screenHeight * .6);
  const mvpa = calculateMVPA(accel_x, accel_y, accel_z, age, screenHeight * .6);
  const goal = sb.hasMetGoal && lpa.hasMetGoal && mvpa.hasMetGoal;
  const showGoalOptions = Object.values(userData).some(value => value === null || value === "");
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.page}>
        {modalVisible ? null : (
          showGoalOptions && (
            <View style={goal ? styles.achievedGoalBox : styles.unachievedGoalBox}>
              <Text style={styles.text}>
                {goal ? "You have achieved your goal for today!" : "You have not reached your goal for today."}
              </Text>
            </View>
          )
        )}
        {/* LPA and MVPA blocks */}
        <View style={styles.middleContainer}>
          <Swiper showsButtons={false} style={styles.swiper}>
            {/* Sedentary Bar */}
            <View style={styles.barContainer}>
              <View style={styles.block}></View>
              <Text style={[styles.target]}>Target: { sb.target[1].toFixed(2) }mg</Text>
              <Text style={[{fontWeight: "bold"}]}>Sedentary Behavior</Text>
              <Text style={[{fontWeight: "bold"}]}>(SB)</Text>
              <View style={[styles.progressBar, { height: sb.enmoProgressHeight }]}></View>  
              <Text style={[styles.percentage, { height: sb.enmoProgressHeight }]}> { sb.enmoValue }mg</Text>
            </View> 

            {/* LPA Bar */}
            <View style={styles.barContainer}>
              <View style={styles.block}></View>
              <Text style={[styles.target]}>Target: { lpa.target[0].toFixed(2) }mg - {lpa.target[1].toFixed(2)}mg</Text>
              <Text style={[{fontWeight: "bold"}]}>Light Physical Activity</Text>
              <Text style={[{fontWeight: "bold"}]}>(LPA)</Text>
              <View style={[styles.progressBar, {height: lpa.enmoProgressHeight }]}></View>  
              <Text style={[styles.percentage, {height: lpa.enmoProgressHeight }]}> { lpa.enmoValue }mg</Text>
            </View>

            {/* MVPA Bar */}
            <View style={styles.barContainer}>
              <View style={styles.block}></View>
              <Text style={[styles.target]}>Target: { mvpa.target[0].toFixed(2) }mg +</Text>
              <Text style={[{fontWeight: "bold"}]}>Moderate to Vigorous</Text>
              <Text style={[{fontWeight: "bold"}]}>Physical Activity (MVPA)</Text>
              <View style={[styles.progressBar, { height: mvpa.enmoProgressHeight }]}></View>  
              <Text style={[styles.percentage, { height: mvpa.enmoProgressHeight }]}> { mvpa.enmoValue }mg</Text>
            </View>
          </Swiper>
        </View>

        {/* Activity Box */}
        {/* <View style={styles.box}>
          <Text style={[{fontWeight: "bold", 
                        fontSize: 16, 
                        textAlign: 'center'}
                        ]}>
            Activity
          </Text>
          <View style={styles.activityContainer}> 
            <View style={styles.column}> 
              <Text style={styles.text}>Age: { userData.age }</Text>
              <Text style={styles.text}>Weight: { userData.weight } lbs.</Text>
              <Text style={styles.text}>Height: { userData.height } in.</Text>
            </View>

            <View style={styles.column}> 
              <Text style={styles.text}>Activity: { userData.activity }</Text>
              <Text style={styles.text}>MET Value: { met }</Text>
              <Text style={styles.text}>Duration: { userData.duration } mins</Text>
              <Text style={styles.text}>Calories: { lpa.calories.toFixed(2) } </Text>
            </View>
          </View>
        </View> */}

        {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style= {styles.addActivityButton}>
            <Text style={[{fontWeight: "bold", 
                            fontSize: 20, 
                            color: 'white',
                            textAlign: 'center'}
                            ]}>Add Activity</Text>
          </View>
        </TouchableOpacity> */}

        {/* <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter User Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Duration of Activity (minutes)"
              onChangeText={(text) => setUserData({ ...userData, duration: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Activity Type"
              onChangeText={(text) => setUserData({ ...userData, activity: text })}
            />
            <View style={styles.buttonContainer}>
              <View style={[styles.button, {color: "#62C0FF"}]}>
                <Button title="Submit" onPress={handleSubmit} color="white"/>
              </View>
              <View style={[styles.button, {color: "#FF4754"}]}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="white"/>
              </View>
            </View>
          </View>
        </Modal> */}
      </View>
    </ScrollView>
    
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    flex: 1,
  },
  middleContainer: {
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  block: {
    width: screenWidth * 0.5,
    height: screenHeight * .6,
    backgroundColor: '#F2F2F2', 
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  box: {
    width: screenWidth * 0.8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  swiper: {
    paddingTop: 30,
    height: screenHeight *0.75,
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginLeft: 10,
    marginRight: 10,
  },
  target: {
    position: "absolute",
    top: -20,
    alignSelf: "center",
    justifyContent: "flex-end",
    fontWeight: "bold",
  },
  progressBar: {
    position: 'absolute',
    bottom: 45,
    width: screenWidth * 0.5,
    backgroundColor: '#89EEC4', // Customize the color of the bar
    borderRadius: 5,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  percentage: {
    fontWeight: "bold",
    position: 'absolute',
    bottom: 43,
  },  
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 20,
  },
  addActivityButton: {
    width: 150,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#62C0FF",
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievedGoalBox: {
    width: 375,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    padding: 10,
    backgroundColor: "#8BFF8E", 
    justifyContent: 'center',
    alignItems: 'center',
  },
  unachievedGoalBox: {
    width: 375,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    padding: 10,
    backgroundColor: "#FFA14D", 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 40,
    width: 100,
    borderRadius: 20,
  },
  swiperWrapper: {
    flex: 1
  },
});

export default Activity;
