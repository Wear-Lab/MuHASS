import React, { useState } from "react";
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
  calculateLVPA,
  calculateMVPA,
} from '../components/ActivityCalculations';
import Swiper from 'react-native-swiper';
import SampleData from '../components/data/SampleData';

const Activity = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    age: null,
    weight: null,
    height: null,
    duration: null,
    activity: "",
  });

  const handleSubmit = () => {
    const { age, weight, height, duration, activity } = userData;
    
    // Close the modal
    setModalVisible(false);
  };

  const { met } = SampleData.SampleData;

  // Perform any necessary calculations or operations with the user data
  const lvpa = calculateLVPA(met, userData.weight, userData.duration);
  const mvpa = calculateMVPA(met, userData.weight, userData.duration);
  const goal = lvpa.goal && mvpa.goal;
  const showGoalOptions = !Object.values(userData).some(value => value === null || value === "");
  
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
        {/* LVPA and MVPA blocks */}
        <View style={styles.middleContainer}>
          <Swiper showsButtons={false}>
            {/* Sedentary Bar */}
            <View style={styles.barContainer}>
              <View style={styles.block}></View>
              <Text style={[styles.target]}>Target: { lvpa.target.toFixed(2) }</Text>
              <Text style={[{fontWeight: "bold"}]}>Sedentary Activity</Text>
              <Text style={[{fontWeight: "bold"}]}>(LPA)</Text>
            </View> 

            {/* LVPA Bar */}
            <View style={styles.barContainer}>
              <View style={styles.block}></View>
              <Text style={[styles.target]}>Target: { lvpa.target.toFixed(2) }</Text>
              <Text style={[{fontWeight: "bold"}]}>Light Physical Activity</Text>
              <Text style={[{fontWeight: "bold"}]}>(LPA)</Text>
              <View style={[styles.blackBar, {bottom: lvpa.position }]}></View>  
              <Text style={[styles.percentage, {bottom: lvpa.position + 11, left: 120, }]}> { lvpa.percentage.toFixed(0) }%</Text>
            </View>

            {/* MVPA Bar */}
            <View style={styles.barContainer}>
              <View style={styles.block}></View>
              <Text style={[styles.target]}>Target: { mvpa.target.toFixed(2) }</Text>
              <Text style={[{fontWeight: "bold"}]}>Moderate to Vigorous</Text>
              <Text style={[{fontWeight: "bold"}]}>Physical Activity (MVPA)</Text>
              <View style={[styles.blackBar, {bottom: lvpa.position }]}></View>  
              <Text style={[styles.percentage, {bottom: lvpa.position + 11, left: 120, }]}> { mvpa.percentage.toFixed(0) }%</Text>
            </View>
          </Swiper>
        </View>

        {/* Activity Box */}
        <View style={styles.box}>
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
              <Text style={styles.text}>Calories: { lvpa.calories.toFixed(2) } </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style= {styles.addActivityButton}>
            <Text style={[{fontWeight: "bold", 
                            fontSize: 20, 
                            color: 'white',
                            textAlign: 'center'}
                            ]}>Add Activity</Text>
          </View>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter User Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => setUserData({ ...userData, age: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (lbs)"
              onChangeText={(text) => setUserData({ ...userData, weight: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Height (inches)"
              onChangeText={(text) => setUserData({ ...userData, height: text })}
            />
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
              <View style={[styles.button, {backgroundColor: "#62C0FF"}]}>
                <Button title="Submit" onPress={handleSubmit} color="white"/>
              </View>
              <View style={[styles.button, {backgroundColor: "#FF4754"}]}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="white"/>
              </View>
            </View>
          </View>
        </Modal>
        
      </View>
    </ScrollView>
    
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    marginTop: 60,
    marginBottom: 100,
  },
  middleContainer: {
    height: screenHeight * 0.52,
    flexDirection: "row",
    marginTop: 40,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  barContainer: {
    alignItems: 'center'
  },
  block: {
    width: screenWidth * 0.4,
    height: screenHeight *0.43,
    backgroundColor: '#89EEC4', 
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  box: {
    width: screenWidth * 0.8,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },

  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    alignContent: 'center',
  },
  optionText: {
    fontSize: 16,
    margin: 7.5,
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
  blackBar: {
    height: 5, // Customize the height of the bar
    width: screenWidth * 0.45,
    backgroundColor: 'black', // Customize the color of the bar
    borderRadius: 20,
  },
  blackbarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  percentage: {
    fontWeight: "bold",
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
