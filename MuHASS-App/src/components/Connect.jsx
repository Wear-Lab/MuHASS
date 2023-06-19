import { useSyncExternalStore } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const Connect = () => {
  const [device, setDevice] = useState();

  const options = {
    method: "GET",
    url: "",
  };

  try {
    const response = axios.request(options);
    setDevice(response.content);
  } catch (err) {
    console.error(err);
  }

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Connect;
