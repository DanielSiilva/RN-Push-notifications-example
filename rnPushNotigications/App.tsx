import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNotifications } from "./hook/useNotifications";
import * as Notifications from "expo-notifications";

const App = () => {
  const expoPushToken = useNotifications();

  useEffect(() => {
    // Ouvinte para notificações recebidas enquanto o app está aberto
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificação recebida:", notification);
      }
    );

    // Ouvinte para interações com a notificação (usuário tocou na notificação)
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Interagiu com a notificação:", response);
      }
    );

    // Função de limpeza para remover os ouvintes
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Exemplo Token de Push</Text>
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
