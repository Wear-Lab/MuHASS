import { View, Text } from "react-native";

const Monitor = () => {
  // For testing purposes
  // the comments below were just testing out how to display data with Chart.js
  // might not move forward with Chart.js though

  // const [data, setData] = useState({
  //   labels: UserData.map((user) => user.broData.broLabel), // going through the userData array and making a new one that has all the labels
  //   datasets: [
  //     {
  //       label: "User Health Data",
  //       data: UserData.map((user) => user.broData.broHealth), // going through the userData array and making a new one that has all the users' health
  //       backgroundColor: "teal",
  //     },
  //   ],
  // });
  // <Bar data={data} />

  return (
    <View>
      <Text>Health monitoring</Text>
    </View>
  );
};

export default Monitor;
