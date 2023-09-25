import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';


const Assignment = () => {

    const tableHead = ['Mã Yêu cầu', 'Tên Khách Hàng', 'Gợi ý', 'Phân Công', " "]
    const tableData = [
        ['YC001', 'Thanh Thanh', 'Nhân viên 1', "", "confirm"],
        ['YC002', 'Thúy Anh', '', 'Nhân viên 2', "confirm"],
        ['YC003', 'Thùy Linh', 'Nhân viên 3', '', "confirm"],
        ['YC004', 'Tú Tring', '', 'Nhân viên 4', "confirm"]
    ];


    const renderButton = (data, index) => (
        <TouchableOpacity >
            <View style={styles.btn}>
                <Text style={styles.btnText}>Xác nhận</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                {
                    tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell
                                        key={cellIndex}
                                        data={cellIndex === 4 ? renderButton(cellData, index) : cellData}
                                        textStyle={styles.text} />
                                ))
                            }
                        </TableWrapper>
                    ))
                }
            </Table>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 60, backgroundColor: 'lightblue' },
    text: { textAlign: "center", marginTop: 10, marginBottom: 10, fontSize: 16 },
    row: { flexDirection: 'row', backgroundColor: '#f1f8ff' },

    btnText: {
        textAlign: 'center',
        color: "blue",
        textDecorationLine: 'underline',
    }
});

export default Assignment;
