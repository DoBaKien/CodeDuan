import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

function Footer() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => console.log("menu")}>
                <Icon name="menu" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => console.log("search")}>
                <Icon name="search" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => console.log("heart")}>
                <Icon name="heart" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => console.log("user")}>
                <Icon name="person" size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -5,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    dateView: {
        alignItems: 'center',
        width: 200
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});

export default Footer;