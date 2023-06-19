import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SelectList } from 'react-native-dropdown-select-list'

const connect = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Wifi 1'},
      {key:'2', value:'Wifi 2'},
      {key:'3', value:'Wifi 3'},
      {key:'4', value:'Wifi 4'},
  ]

  return(
    <View style = {styles.container}>
    <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        // setSelected={setSelected} data={data}
    />
    </View>
  )

  // const [data,setData] = React.useState([]);
  
  // React.useEffect(() => 
  //   //Get Values from database
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => {
  //       // Store Values in Temporary Array
  //       let newArray = response.data.map((item) => {
  //         return {key: item.id, value: item.name}
  //       })
  //       //Set Data Variable
  //       setData(newArray)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // ,[])

  // return(
  //   <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
  // )

};

const styles = StyleSheet.create({
    container: {
      height: 100, 
      width:400,
    }
  });

export default connect;

