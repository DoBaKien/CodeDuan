import React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {dataPc} from './data';

const ModalPc = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <View style={[styles.itemView, {backgroundColor: 'lightblue'}]}>
            <Text style={styles.itemTextName}>Tên nhân viên</Text>
            <Text style={styles.itemTextStt}>Khoảng cách</Text>
          </View>
          <ScrollView style={{width: '100%', height: 200}}>
            <View style={styles.tasksWrapper}>
              <View style={{width: '100%'}}>
                {dataPc.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        Alert.alert(`Bạn đã giao yêu cầu cho ${item.name}`)
                      }>
                      <View style={styles.itemView}>
                        <Text style={styles.itemTextName}>{item.name}</Text>
                        <Text style={styles.itemTextStt}>
                          {item.KC || '200m'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalPc;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },

  itemView: {
    backgroundColor: '#55BCF6',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  itemTextName: {
    flex: 2,
    fontSize: 16,
  },
  itemTextStt: {
    flex: 1,
    textAlign: 'center',
  },
});
