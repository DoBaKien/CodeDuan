import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import Footer from '../../assets/component/Footer';

const Assignment = () => {
  const tableHead = ['Mã Yêu cầu', 'Tên Khách Hàng', 'Gợi ý', 'Phân Công', ''];
  const tableData = [
    ['YC001', 'Thanh Thanh', 'Nhân viên 1', '', ''],
    ['YC002', 'Thúy Anh', '', 'Nhân viên 2', ''],
    ['YC003', 'Thùy Linh', 'Nhân viên 3', '', ''],
    ['YC004', 'Tú Trinh', '', 'Nhân viên 4', ''],
  ];

  const CotBtn = (data, index) => (
    <TouchableOpacity onPress={() => console.log(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Xác nhận</Text>
      </View>
    </TouchableOpacity>
  );

  const CotGoiY = (data, index) => (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={() => Alert.alert(`Bạn chọn ${data}`)}>
      <Text style={{textAlign: 'center', fontSize: 16, marginHorizontal: 10}}>
        {data}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  cellIndex === 4
                    ? CotBtn(cellData, index)
                    : cellData && cellIndex === 2
                    ? CotGoiY(cellData, index)
                    : cellData
                }
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 80, backgroundColor: 'lightblue', width: '100%'},
  text: {
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 16,
    color: 'black',
  },
  row: {height: 80, flexDirection: 'row', backgroundColor: '#f1f8ff'},

  btnText: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Assignment;
