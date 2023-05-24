import { StyleSheet, View, Text } from "react-native";
import HomeTwo from "./src/components/HomeTwo";

const App = () => {
  return <HomeTwo />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
