import moment from 'moment';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Header() {
  const weekday = moment().format('dddd');
  const date = moment().format('L');
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('menu')}>
        <Icon name="menu" size={40} color="black" />
      </TouchableOpacity>
      <View style={styles.dateView}>
        <Text style={styles.text}>{weekday}</Text>
        <Text style={styles.text}>Ngày {date}</Text>
      </View>

      <TouchableOpacity onPress={() => console.log('user')}>
        <Icon name="person-circle-outline" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dateView: {
    alignItems: 'center',
    width: 200,
  },
  text: {
    color: 'black',
    paddingVertical: 2,
  },
});

export default Header;
