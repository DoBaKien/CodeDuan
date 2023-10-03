import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {ModalImg} from './ModalImg';
import axios from 'axios';

function ModalDone() {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [imagesT, setImagesT] = useState([]);
  const [imagesS, setImagesS] = useState([]);
  const [nguyenNhan, setNguyenNhan] = useState('');
  const [xuLi, setXuLi] = useState('');
  const [kQua, setKQua] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  const handleClick = async () => {
    if (
      imagesT !== '' &&
      imagesS !== '' &&
      nguyenNhan !== '' &&
      xuLi !== '' &&
      kQua !== '' &&
      ghiChu !== ''
    ) {
      console.log(nguyenNhan, xuLi, kQua, ghiChu);
      //   imagesT.map(image => {
      //     axios
      //       .post(
      //         'http://10.170.210.202:7003/ServiceUTILITIES-UTILITIES-context-root/resources/ServiceUTILITIES/cruFile',
      //         {
      //           APP_KEY: 'SPC.NRKH',
      //           ORG_CODE: 'F02D02',
      //           FILE_NAME: image.name,
      //           FILE_TYPE: image.file_type,
      //           FILE_CONTENT: image.base64,
      //           CREATED_BY: '36849',
      //         },
      //       )
      //       .then(function (response) {
      //         console.log('Success:', response.data);
      //       })
      //       .catch(function (error) {
      //         console.log(error);
      //       });
      //   });

      //   imagesS.map(image => {
      //     axios
      //       .post(
      //         'http://10.170.210.202:7003/ServiceUTILITIES-UTILITIES-context-root/resources/ServiceUTILITIES/cruFile',
      //         {
      //           APP_KEY: 'SPC.NRKH',
      //           ORG_CODE: 'F02D02',
      //           FILE_NAME: image.name,
      //           FILE_TYPE: image.file_type,
      //           FILE_CONTENT: image.base64,
      //           CREATED_BY: '36849',
      //         },
      //       )
      //       .then(function (response) {
      //         console.log('Success:', response.data);
      //       })
      //       .catch(function (error) {
      //         console.log(error);
      //       });
      //   });
    } else {
      Alert.alert('vui long dien day du');
    }
  };

  return (
    <View style={styles.centeredView}>
      <ModalImg
        setVisible={setVisible}
        visible={visible}
        imagesT={imagesT}
        imagesS={imagesS}
        type={type}
      />
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          placeholder="Nhập nguyên nhân..."
          onChangeText={value => setNguyenNhan(value)}
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập cách xử lý..."
          onChangeText={value => setXuLi(value)}
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập kết quả xử lý..."
          onChangeText={value => setKQua(value)}
          placeholderTextColor="gray"
        />
        <View style={styles.viewImage}>
          <View style={{width: '40%'}}>
            <View>
              <FlatList
                data={imagesT}
                renderItem={({item}) => (
                  <Image source={{uri: item.uri}} style={styles.image} />
                )}
                horizontal={true}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(true), setType('Truoc');
              }}>
              <Text style={styles.textStyle}>Hình ảnh trước</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '40%'}}>
            <View>
              <FlatList
                data={imagesS}
                renderItem={({item}) => (
                  <Image source={{uri: item.uri}} style={styles.image} />
                )}
                horizontal={true}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(true), setType('Sau');
              }}>
              <Text style={styles.textStyle}>Hình ảnh sau</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú sau khi sửa điện..."
          onChangeText={value => setGhiChu(value)}
          placeholderTextColor="gray"
        />
        <Pressable style={styles.button} onPress={handleClick}>
          <Text style={styles.textStyle}>Hoàn thành sửa điện</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
  },
  modalView: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    color: 'black',
  },
  viewImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default ModalDone;
