import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { NotificationService, onDisplayNotification, requestUserPermission } from '../../assets/component/NotiHelper';
import { io } from 'socket.io-client';

export default function Home({ navigation }) {
    const socket = io.connect("http://10.170.232.98:3002/");
    useEffect(() => {
        requestUserPermission()
        NotificationService()
    }, [])

    socket.emit("join_room", '1');
    useEffect(() => {
        socket.on("new-notification", (data) => {
            onDisplayNotification(data)
        });
    }, [socket]);
    return (
        <View style={styles.container}>
            <Button
                title="Thông báo"
                onPress={onDisplayNotification}
            />
            <Button
                title="Bản đồ"
                onPress={() => {
                    navigation.navigate('Map');
                }}
            />
            <Button
                title="DashBoard"
                onPress={() => {
                    navigation.navigate('DashBoard');
                }}
            />
            <Button
                title="Giám sát"
                onPress={() => {
                    navigation.navigate('Supervision');
                }}
            />
            <Button
                title="Phân công"
                onPress={() => {
                    navigation.navigate('Assignment');
                }}
            />
            <Button
                title="Api"
                onPress={() => {
                    navigation.navigate('Api');
                }}
            />
            <Button
                title="Realm"
                onPress={() => {
                    navigation.navigate('Realm');
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
