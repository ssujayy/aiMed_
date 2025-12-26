import * as Notifications from "expo-notifications";
import { SchedulableNotificationTriggerInput } from "expo-notifications";

export const localNotify = async (
  title: string,
  body: string,
  trigger: SchedulableNotificationTriggerInput
) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Notifications permission not granted!");
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBadge: true,
      shouldPlaySound: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldSetBadge: true,
    }),
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });
};
