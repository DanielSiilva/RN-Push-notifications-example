import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNotifications } from "./hook/useNotifications";

const App = () => {
  const expoPushToken = useNotifications();

  return (
    <View style={styles.container}>
      <Text>Exemple Token de Push:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
