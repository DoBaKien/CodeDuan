import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  NotificationService,
  onDisplayNotification,
  requestUserPermission,
} from '../../assets/component/NotiHelper';
import {io} from 'socket.io-client';

export default function Home({navigation}) {
  const socket = io.connect('http://10.170.232.98:3002/');
  useEffect(() => {
    requestUserPermission();
    NotificationService();
  }, []);

  socket.emit('join_room', '1');
  useEffect(() => {
    socket.on('new-notification', data => {
      onDisplayNotification(data);
    });
  }, [socket]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onDisplayNotification({title: 'thông báo', body: 'đã dc phân công'});
        }}>
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
