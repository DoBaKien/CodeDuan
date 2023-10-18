import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'oldtoken');

  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const NotificationService = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.data,
    );

    // Linking.openURL(`myapp://app/${remoteMessage.data.screen}`);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Noti in foreground', remoteMessage.data);

    onDisplayNotification(
      remoteMessage.notification,
      remoteMessage.data.screen,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // Linking.openURL(`myapp://app/${remoteMessage.data.screen}`);
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.data,
        );
      }
    });
};

export async function onDisplayNotification(data, screen) {
  // Request permissions (required for iOS)
  notifee
    .getBadgeCount()
    .then(count => console.log('Current badge count: ', count));
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default1',
    name: 'Default Channel 1',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });
  // Display a notification
  await notifee.displayNotification({
    title: data.title && data.title ? data.title : 'tiêu đề',
    body: data.body && data.body ? data.body : 'body',
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      actions: [
        {
          title: '<b>Đồng ý</b>',
          pressAction: {
            id: 'accept',
          },
        },
        {
          title: '<b>Từ chối</b>',
          pressAction: {
            id: 'ingore',
          },
        },
      ],
    },
  });

  notifee.onForegroundEvent(async ({type, detail}) => {
    if (detail.pressAction?.id !== undefined) {
      await notifee.cancelNotification(detail.notification.id);
      console.log(detail.pressAction.id);
    } else {
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification', detail.notification);
          await notifee.cancelNotification(detail.notification.id);
          break;
        case EventType.PRESS:
          Linking.openURL(`myapp://app/${screen}`);

          // console.log('User pressed notification', detail.notification);
          await notifee.cancelNotification(detail.notification.id);
          break;
      }
    }
  });
}
