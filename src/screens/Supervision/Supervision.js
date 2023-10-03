import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import ModalVision from '../../assets/component/ModalVision';
import Footer from '../../assets/component/Footer';

const Supervision = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [type, setType] = React.useState('');
  const tableHead = ['Mã Yêu cầu', 'Tên Khách Hàng', 'Trạng thái', 'Chi tiết'];
  const tableData = [
    ['YC001', 'Thanh Thanh', 'Đang xử lý', 'Đang xử lý'],
    ['YC002', 'Thúy Anh', 'Đã hoàn thành', 'Đã hoàn thành'],
    ['YC003', 'Thùy Linh', 'Đã xác nhận', 'Đã xác nhận'],
    ['YC004', 'Tú Tring', 'Đã từ chối', 'Đã từ chối'],
  ];

  const renderButton = (data, index) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true), setType(data);
      }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Xem chi tiết</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ModalVision
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        type={type}
      />
      <Table borderStyle={{borderWidth: 2, borderColor: 'black'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  cellIndex === 3 ? renderButton(cellData, index) : cellData
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
  head: {height: 60, backgroundColor: 'lightblue'},
  text: {textAlign: 'center', marginTop: 10, marginBottom: 10, color: 'black'},
  row: {flexDirection: 'row', backgroundColor: '#f1f8ff'},

  btnText: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Supervision;
