import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Connect = ({ exitConnect }) => {

  const handleExitConnect = () => {
    // Call the exitConnect callback to change the activeTab state to "Monitoring"
    exitConnect();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {marginTop: 50}]}>
        <Text style={styles.text}>Scan for Devices</Text>
      </TouchableOpacity>
      <View style={styles.box}></View>
      <TouchableOpacity style={[styles.button, {marginBottom: 30}]} onPress={handleExitConnect}>
        <Text style={styles.text}>Continue to App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  box: {
    margin: 10,
    width: '80%',
    height: 450,
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
  },
  deviceList: {
    alignSelf: 'stretch',
    backgroundColor: "#F2F2F2",
    width: '100%',
    borderRadius: 15,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 5,
    backgroundColor: "#62C0FF",
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Connect;
