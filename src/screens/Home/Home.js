import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  NotificationService,
  requestUserPermission,
} from '../../assets/component/NotiHelper';
import axios from 'axios';

export default function Home({navigation}) {
  useEffect(() => {
    requestUserPermission();
    NotificationService();
  }, []);

  const postNotification = () => {
    axios
      .post('http://10.170.215.9:3000/api/send', {
        title: 'title',
        body: 'body',
        token:
          'dsl0p9VTR6yNWv83vKJPEK:APA91bGDcjlmet7CEmeb7IwEjRBDhuMPHUI8xVT0uk-qXYylKeRvXhHsCdj61PlgkahMTAxSziNagCYAN1daybrFV2_G2-QCT6MilmGz51EAJqGT3k-0WGeVCzkL0HY0XWoukEwxFACj',
        data: {
          screen: 'order',
        },
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => postNotification()}>
        <Text style={styles.appButtonText}>Thông báo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Order');
        }}>
        <Text style={styles.appButtonText}>Đơn yêu cầu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Map');
        }}>
        <Text style={styles.appButtonText}>Bản đồ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('DashBoard');
        }}>
        <Text style={styles.appButtonText}>DashBoard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Supervision');
        }}>
        <Text style={styles.appButtonText}>Giám sát</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Assignment');
        }}>
        <Text style={styles.appButtonText}>Phân công</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Api');
        }}>
        <Text style={styles.appButtonText}>Api</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Realm');
        }}>
        <Text style={styles.appButtonText}>Realm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    width: 300,
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
