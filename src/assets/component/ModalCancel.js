import {useState} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import {Keyboard} from 'react-native';

function ModalCancel() {
  const [ghiChu, setGhiChu] = useState('');

  const handleClick = () => {
    console.log(ghiChu);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú khi sửa điện.."
          onEndEditing={handleClick}
          onChangeText={value => setGhiChu(value)}
          placeholderTextColor="gray"
        />

        <Pressable
          style={styles.button}
          onPress={handleClick}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.textStyle}>Hủy yêu cầu</Text>
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
  },
});

export default ModalCancel;
