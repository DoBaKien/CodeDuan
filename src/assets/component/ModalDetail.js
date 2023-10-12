import React from 'react';
import {Modal, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import ModalDone from './ModalDone';
import ModalCancel from './ModalCancel';

const ModalDetail = props => {
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
        {props.type === 'done' ? (
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.title}>Báo cáo công việc</Text>
              <ModalDone />
            </View>
          </View>
        ) : (
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.title}>Từ chối yêu cầu</Text>
              <ModalCancel />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalDetail;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    backgroundColor: 'white',
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  header: {},
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
