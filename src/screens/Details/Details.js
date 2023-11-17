import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
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
        <Text style={styles.boxHeader}>
          <Text style={{fontSize: 20, color: 'black'}}>Mã yêu cầu: </Text>
          <Text style={styles.textHeader}> YC001</Text>
        </Text>
      </View>
      <Text style={styles.textHeader}>Thông tin khách hàng</Text>
      <View style={styles.body}>
        <Text style={styles.textbody}>
          Mã khách hàng: 87b27689-9b5b-591c-a360
        </Text>
        <Text style={styles.textbody}>Tên khách hàng: Verna Lynch</Text>
        <Text style={styles.textbody}>Địa chỉ: Congo - Brazzaville </Text>
        <Text style={styles.textbody}>Mã điểm đo: 87b27689-9b5b-591c </Text>
      </View>
      <Text style={[styles.textHeader, {marginTop: 20}]}>Thông tin đơn</Text>
      <View style={styles.body}>
        <Text style={styles.textbody}>Mã đơn: YC001</Text>

        <Text style={styles.textbody}>Người phân công: Jean Arnold</Text>
        <Text style={styles.textbody}>Ngày phân công: 05/10/2023</Text>
      </View>
      {show ? (
        <View style={styles.nav}>
          <TouchableOpacity
            style={[styles.button, styles.btn]}
            onPress={() =>
              navigation.navigate('Map', {
                data: 'asd',
              })
            }>
            <Icon name="map-marked-alt" size={30} color="#fff" />
            <Text style={styles.textStyle}>Mở bản đồ</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#d92686'}]}
          onPress={() => {
            setModalVisible(true);
            setType('huy');
          }}>
          <Text style={styles.textStyle}>Từ chối yêu cầu</Text>
        </TouchableOpacity>
        {!show ? (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#262cd9'}]}
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
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginVertical: 20,
  },
  boxHeader: {
    textAlign: 'center',
    width: 300,
    backgroundColor: '#b5e1a4',
    padding: 20,
    borderRadius: 20,
  },
  textHeader: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    gap: 10,
    marginHorizontal: 20,
    backgroundColor: '#ecdaf3',
    borderRadius: 20,
    padding: 20,
    marginTop: 5,
    width: '90%',
  },
  textbody: {
    fontSize: 16,
    color: 'black',
  },
  nav: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
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
    backgroundColor: '#d97926',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
