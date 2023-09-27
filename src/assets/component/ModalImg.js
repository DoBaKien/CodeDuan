

import React, { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
export const ModalImg = ({ visible, setVisible, type, imagesT, imagesS }) => {
    const [showModal, setShowModal] = useState(visible);

    useEffect(() => {
        toggle();
    }, [visible]);
    const toggle = () => {
        if (visible) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    };

    const pickImageCam = async () => {

        ImagePicker.openCamera({
            // includeBase64: true
        }).then(result => {
            if (type === "Truoc") {
                imagesT.push({
                    uri: result.path,
                    // file_type: result.mime,
                    // base64: `data:${result.mime};base64,` + result.data
                })

            } else if (type === "Sau") {
                imagesS.push({
                    uri: result.path,
                    // file_type: result.mime,
                    // base64: `data:${result.mime};base64,` + result.data
                })
            }
        }).catch(error => {
            console.log('error');
        })
        setVisible(false);
    };


    const pickImage = () => {
        ImagePicker.openPicker({
            multiple: true,
            // includeBase64: true
        }).then(result => {
            // console.log(result);
            if (type === "Truoc") {
                result.map(image => {
                    imagesT.push({
                        uri: image.path,
                        // file_type: images.mime,
                        // base64: `data:${images.mime};base64,` + images.data
                    })
                })
            } else if (type === "Sau") {
                result.map(image => {
                    imagesS.push({
                        uri: image.path,
                        // file_type: images.mime,
                        // base64: `data:${images.mime};base64,` + images.data
                    })
                })
            }
        }).catch(error => {
            console.log('error');
        })
        setVisible(false);
    };


    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBg}>
                <View style={styles.modalContainer}>
                    <View style={styles.option}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: "#87D6E1",
                                },
                            ]}
                            onPress={() => {
                                pickImageCam(false);
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Mở camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: "#87D6E1",
                                },
                            ]}
                            onPress={() => {
                                pickImage();
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Mở thư viện</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={[
                                styles.otpbutton,
                                {
                                    backgroundColor: "#DD5757",
                                },
                            ]}
                            onPress={() => {
                                setVisible(false);
                            }}
                        >
                            <Text color="white">{type}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    option: {
        marginBottom: 5,
    },
    button: {
        padding: 10,
        alignItems: "center",
        borderRadius: 20,
        width: "100%",
        marginBottom: 10,
    },
    modalBg: {
        height: 800,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    otpbutton: {
        padding: 10,
        alignItems: "center",
        borderRadius: 20,
        width: "40%",
    },
});