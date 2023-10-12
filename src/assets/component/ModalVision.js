import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';

function ModalVision(props) {
  const renderItem = ({item}) => (
    <Image source={item.source} style={styles.image} />
  );
  const data = [
    {id: '1', source: require('../home_slide1.jpg')},
    {id: '2', source: require('../home_slide1.jpg')},
    {id: '3', source: require('../home_slide1.jpg')},
  ];
  const checkType = () => {
    if (props.type === 'Đang xử lý') {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            margin: 20,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>3.5h</Text>
          </TouchableOpacity>
          <View style={styles.circle}>
            <Text style={styles.circleText}>80m</Text>
          </View>
        </View>
      );
    } else if (props.type === 'Đã từ chối') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Lý do: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
        </View>
      );
    } else if (props.type === 'Đã hoàn thành') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Nguyên nhân: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.viewInput}>
            <Text style={styles.text}>Cách xử lý: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Kết quả: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
          <View style={styles.viewImage}>
            <View style={{width: '40%'}}>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={true}
              />
            </View>
            <View style={{width: '40%'}}>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={true}
              />
            </View>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Ghi chú: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
        </View>
      );
    } else if (props.type === 'Chưa đồng bộ') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Nguyên nhân: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.viewInput}>
            <Text style={styles.text}>Cách xử lý: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Kết quả: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
          <View style={styles.viewImage}>
            <View style={{width: '40%'}}>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={true}
              />
            </View>
            <View style={{width: '40%'}}>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={true}
              />
            </View>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.text}>Ghi chú: </Text>
            <TextInput
              value="This is disabled"
              editable={false}
              style={styles.input}
            />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable style={[styles.button, {width: 200}]}>
              <Text style={styles.textStyle}>Đồng bộ</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{props.type}</Text>
          {checkType()}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
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
  title: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  viewInput: {
    paddingVertical: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    color: 'black',
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
  },
  viewImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 50,
    color: 'purple',
    fontWeight: 'bold',
  },
});

export default ModalVision;
