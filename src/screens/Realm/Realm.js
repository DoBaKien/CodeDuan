import {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Realm from 'realm';

function RealmEx() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [id, setId] = useState('');
  const [idD, setIdD] = useState('');

  const [list, setList] = useState([]);
  const PersonSchema = {
    name: 'Person',
    properties: {
      id: 'int',
      name: 'string',
      age: 'string',
    },
    primaryKey: 'id',
  };

  // Mở hoặc tạo một Realm database
  const getRealm = async () =>
    await Realm.open({path: 'myrealm', schema: [PersonSchema]});

  // Thêm một người mới vào danh bạ
  const createPerson = async (name, age) => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const id = realm.objects('Person').length + 1;
        realm.create('Person', {id, name, age});
      });
      Alert.alert('thanh cong', 'Them thanh cong');
      getAllPeople();
    } catch (e) {
      console.log(e);
    }
  };

  // Lấy danh sách tất cả người trong danh bạ
  const getAllPeople = async () => {
    const realm = await getRealm();
    const data = realm.objects('Person');
    setList(data);
  };

  // Cập nhật thông tin của người trong danh bạ
  const updatePerson = async (id, newName, newAge) => {
    const realm = await getRealm();
    try {
      const person = realm.objectForPrimaryKey('Person', id);
      realm.write(() => {
        person.name = newName;
        person.age = newAge;
      });
      getAllPeople();
      Alert.alert('thanh cong', 'cap nhat thanh cong');
      console.log('done');
    } catch (e) {
      console.log(e);
    }
  };

  // Xóa người khỏi danh bạ
  const deletePerson = async id => {
    const realm = await getRealm();
    const person = realm.objectForPrimaryKey('Person', id);
    realm.write(() => {
      realm.delete(person);
    });
    getAllPeople();
    Alert.alert('thanh cong', 'Xóa thanh cong');
    console.log('done');
  };

  return (
    <View>
      <TextInput
        onChangeText={setId}
        value={id}
        style={styles.input}
        keyboardType="numeric"
        placeholder="id"
      />
      <TextInput
        onChangeText={setName}
        value={name}
        style={styles.input}
        placeholder="name"
      />
      <TextInput
        onChangeText={setAge}
        value={age}
        style={styles.input}
        keyboardType="numeric"
        placeholder="age"
      />
      <View style={{gap: 10}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => createPerson(name, age)}>
          <Text style={styles.appButtonText}>create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => getAllPeople()}>
          <Text style={styles.appButtonText}>read</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => updatePerson(parseInt(id), name, age)}>
          <Text style={styles.appButtonText}>update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => deletePerson(parseInt(id))}>
          <Text style={styles.appButtonText}>delete</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'black'}}>Bảng dữ liệu</Text>
        {list.map(laa => {
          return (
            <View
              key={laa.id}
              style={{
                flexDirection: 'row',
                marginTop: 10,
                width: '100%',
                display: 'flex',

                justifyContent: 'space-around',
              }}>
              <Text style={{fontSize: 20, color: 'black'}}>{laa.id}</Text>
              <Text style={{fontSize: 20, color: 'black'}}>{laa.name}</Text>
              <Text style={{fontSize: 20, color: 'black'}}>{laa.age}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default RealmEx;
