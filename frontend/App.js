import { StyleSheet, Text, View } from "react-native";
import Home from "./src/pages/HomePage";

const port = process.env.PORT || 8080;

const App = () => {
  return <Home />;
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
