import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Footer from '../../assets/component/Footer';
import {dataPc} from '../../assets/component/data';
import Task from '../../assets/component/Task';
import ModalPc from '../../assets/component/ModalPc';
import {useState} from 'react';

const Assignment = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ModalPc setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <View style={[styles.item, {backgroundColor: '#55BCF6'}]}>
              <Text style={styles.itemTextId}>ID</Text>
              <Text style={styles.itemTextName}>Tên khách hàng</Text>
              <Text style={styles.itemTextStt}>Phân Công</Text>
            </View>
            {dataPc.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Task data={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E8EAED'},
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  itemTextId: {
    width: 70,
    fontSize: 16,
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

export default Assignment;
