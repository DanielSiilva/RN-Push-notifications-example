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
        alert("Failed to get push token for notification!");
        return "";
      }

      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "03ee4d7a-d928-4e6c-9b4d-fcab551a54e9",
        })
      ).data;

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
