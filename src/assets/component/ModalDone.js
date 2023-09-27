import { Pressable, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from 'react';
import { ModalImg } from "./ModalImg";



function ModalDone() {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("")
    const [imagesT, setImagesT] = useState([]);
    const [imagesS, setImagesS] = useState([]);
    const [nguyenNhan, setNguyenNhan] = useState("")
    const [xuLi, setXuLi] = useState("")
    const [kQua, setKQua] = useState("")
    const [ghiChu, setGhiChu] = useState("")


    const handleClick = () => {
        console.log(nguyenNhan);
    }



    return (
        <View style={styles.centeredView}>
            <ModalImg
                setVisible={setVisible}
                visible={visible}
                imagesT={imagesT}
                imagesS={imagesS}
                setImagesS={setImagesS}
                setImagesT={setImagesT}
                type={type} />
            <View style={styles.modalView}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập nguyên nhân..."

                    onChangeText={(value) => setNguyenNhan(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập cách xử lý..."

                    onChangeText={(value) => setXuLi(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập kết quả xử lý..."

                    onChangeText={(value) => setKQua(value)}
                />
                <View style={styles.viewImage}>
                    <View style={{ width: "40%" }}>
                        <View>
                            <FlatList
                                data={imagesT}
                                renderItem={({ item }) => <Image source={{ uri: item.uri }} style={styles.image} />}
                                horizontal={true}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { setVisible(true), setType("Truoc") }}
                        >
                            <Text style={styles.textStyle}>Hình ảnh trước</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "40%" }}>
                        <View>
                            <FlatList
                                data={imagesS}
                                renderItem={({ item }) => <Image source={{ uri: item.uri }} style={styles.image} />}
                                horizontal={true}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { setVisible(true), setType("Sau") }}
                        >
                            <Text style={styles.textStyle}>Hình ảnh sau</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập ghi chú sau khi sửa điện..."

                    onChangeText={(value) => setGhiChu(value)}
                />
                <Pressable
                    style={styles.button}
                    onPress={handleClick}
                >
                    <Text style={styles.textStyle}>Hoàn thành sửa điện</Text>
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
        width: "100%"
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
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
    viewImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%"
    },
    image: {
        width: 50,
        height: 50,
        margin: 5,
    },

});

export default ModalDone;