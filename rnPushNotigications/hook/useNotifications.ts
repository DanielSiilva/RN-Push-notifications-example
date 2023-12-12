import { useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed go get push token ntofication!");
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } else {
      alert("Must use physical device for Push Notifications");
      return "";
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  return expoPushToken;
};
