import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { NotificationService, onDisplayNotification, requestUserPermission } from '../../assets/component/NotiHelper';
export default function Home({ navigation }) {

    useEffect(() => {
        requestUserPermission()
        NotificationService()
    }, [])
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
                title="Test"
                onPress={() => {
                    navigation.navigate('Test');
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
