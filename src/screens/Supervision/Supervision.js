import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Task from '../../assets/component/Task';
import {dataGs} from '../../assets/component/data';
import ModalVision from '../../assets/component/ModalVision';

const Supervision = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  return (
    <View style={styles.container}>
      <ModalVision
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        type={type}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <View style={[styles.item, {backgroundColor: '#55BCF6'}]}>
              <Text style={styles.itemTextId}>ID</Text>
              <Text style={styles.itemTextName}>Tên khách hàng</Text>
              <Text style={styles.itemTextStt}>Trạng thái</Text>
            </View>
            {dataGs.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalVisible(true), setType(item.trangThai);
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

export default Supervision;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
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
