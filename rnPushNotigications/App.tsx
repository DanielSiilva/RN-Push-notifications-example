import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNotifications } from "./hook/useNotifications";
import * as Notifications from "expo-notifications";

const App = () => {
  const expoPushToken = useNotifications();

  useEffect(() => {
    // Ouvinte para notificações recebidas enquanto o app está aberto
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificação recebida:", notification);
        // Aqui você pode atualizar a interface do usuário ou exibir um alerta
        Alert.alert("Notificação Recebida", notification.request.content.body);
      }
    );

    // Ouvinte para interações com a notificação (usuário tocou na notificação)
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Interagiu com a notificação:", response);
        // Aqui você pode redirecionar o usuário ou atualizar a interface do usuário
        Alert.alert(
          "Notificação Interagida",
          response.notification.request.content.body
        );
      }
    );

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
