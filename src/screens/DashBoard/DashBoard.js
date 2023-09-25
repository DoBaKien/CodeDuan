import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';



function DashBoard() {
    return (
        <View style={styles.container}>
            <View style={styles.viewCircle} >
                <View style={styles.circle}>
                    <View elevation={5} style={styles.circleIn}>
                        <Text style={styles.circleText}>8</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.viewCircle, { justifyContent: 'flex-start' }]} >
                <Text style={styles.text}>Khoảng cách đã đi trong ngày</Text>
                <Text style={styles.text}>Số phiếu hoàn thành</Text>
                <Text style={styles.text}>Số phiếu từ chối</Text>
                <Text style={styles.text}>YC001 - Thùy Anh</Text>
            </View>
            <View style={[styles.viewCircle, { flexDirection: "row", justifyContent: "space-evenly" }]}>
                <View elevation={5} style={styles.circle1}>
                    <Icon name="assistant-direction" size={50} color="black" />
                </View>
                <View elevation={5} style={[styles.circle1, { height: 120, width: 120 }]}>
                    <IconM name="tools" size={70} color="black" />
                </View>
                <View elevation={5} style={styles.circle1}>
                    <Icon name="location-on" size={50} color="black" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    viewCircle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 180,
        height: 180,
        borderWidth: 10,
        borderRadius: 180,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#B179DF',
    },
    circle1: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "blue",
        shadowColor: '#000000',
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    circleIn: {
        width: 130,
        height: 130,
        borderWidth: 3,
        borderRadius: 130,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'blue',
        shadowColor: '#000000',
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    circleText: {
        fontSize: 60,
        color: '#B179DF',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        color: '#B179DF',
        fontWeight: 'bold',
        marginVertical: 10
    },
});

export default DashBoard;