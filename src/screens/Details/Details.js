import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalDetail from '../../assets/component/ModalDetail';

const Details = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(false);
  const handleClick = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <ModalDetail
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        type={type}
      />
      <View style={styles.header}>
        <Text style={styles.textHeader}>YC001</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.textbody}>
          Mã khách hàng: 87b27689-9b5b-591c-a360
        </Text>
        <Text style={styles.textbody}>Tên khách hàng: Verna Lynch</Text>
        <Text style={styles.textbody}>Địa chỉ: Congo - Brazzaville </Text>
        <Text style={styles.textbody}>Mã điểm đo: 87b27689-9b5b-591c </Text>
        <Text style={styles.textbody}>Người phân công: Jean Arnold</Text>
        <Text style={styles.textbody}>Ngày phân công: 05/10/2023</Text>
      </View>
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FF1A00'}]}
          onPress={() => {
            setModalVisible(true);
            setType('huy');
          }}>
          <Text style={styles.textStyle}>Từ chối yêu cầu</Text>
        </TouchableOpacity>
        {!show ? (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#1A00FF'}]}
            onPress={handleClick}>
            <Text style={styles.textStyle}>Chấp nhận yêu cầu</Text>
          </TouchableOpacity>
        ) : null}
        {show ? (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#26d979'}]}
            onPress={() => {
              setModalVisible(true);
              setType('done');
            }}>
            <Text style={styles.textStyle}>Hoàn thành yêu cầu</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {show ? (
        <View style={styles.nav}>
          <TouchableOpacity
            style={[styles.button, styles.btn]}
            onPress={() => navigation.navigate('Map')}>
            <Icon name="map-marked-alt" size={30} color="#fff" />
            <Text style={styles.textStyle}>Mở bản đồ</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    marginVertical: 20,
    marginTop: 50,
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    gap: 10,
    marginHorizontal: 20,
  },
  textbody: {
    fontSize: 16,
    color: 'black',
  },
  nav: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  btn: {
    backgroundColor: '#26d979',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
