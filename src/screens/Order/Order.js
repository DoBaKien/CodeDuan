import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Task from '../../assets/component/Task';
import ModalVision from '../../assets/component/ModalVision';
import {dataYc} from '../../assets/component/data';

const Order = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');

  const handleClick = data => {
    if (data === 'Đang xử lý') {
      navigation.navigate('Details');
    } else {
      setType(data);
      setModalVisible(true);
    }
  };
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
            {dataYc.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleClick(item.trangThai);
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

export default Order;

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
