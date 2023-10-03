import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../screens/Order/Order';

const Task = props => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTextId}>{props.data.id}</Text>
      <Text style={styles.itemTextName}>{props.data.name}</Text>
      <Text style={styles.itemTextStt}>{props.data.trangThai}</Text>
    </View>
  );
};

export default Task;
