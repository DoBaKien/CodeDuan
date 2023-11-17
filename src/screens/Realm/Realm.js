import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Realm from 'realm';
import uuid from 'react-native-uuid';

import React, {useEffect} from 'react';
function RealmEx() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [list, setList] = useState([]);
  const PersonSchema = {
    name: 'Person',
    properties: {
      id: 'string',
      name: 'string',
      age: 'string',
    },
    primaryKey: 'id',
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  // Mở hoặc tạo một Realm database
  const getRealm = async () =>
    await Realm.open({path: 'myrealmasd', schema: [PersonSchema]});

  // Thêm một người mới vào danh bạ
  const createPerson = async (name, age) => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const id = uuid.v4();
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
  const updatePerson = async (oldName, newName, newAge) => {
    const realm = await getRealm();
    try {
      const person = realm.objects('Person').filtered('name == $0', oldName)[0];

      if (person) {
        realm.write(() => {
          person.name = newName;
          person.age = newAge;
        });
        getAllPeople();
        Alert.alert('Thành công', 'Cập nhật thành công');
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy người có tên ' + oldName);
      }
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

  const deleteAll = async () => {
    const realm = await getRealm();

    realm.write(() => {
      const allPersons = realm.objects('Person');
      realm.delete(allPersons);
    });
    Alert.alert('thanh cong', 'Xóa thanh cong');
    getAllPeople();
  };

  return (
    <View>
      <TextInput
        onChangeText={setId}
        value={id}
        style={styles.input}
        placeholder="Tên cũ"
        placeholderTextColor="gray"
      />
      <TextInput
        onChangeText={setName}
        value={name}
        style={styles.input}
        placeholder="name"
        placeholderTextColor="gray"
      />
      <TextInput
        onChangeText={setAge}
        value={age}
        style={styles.input}
        keyboardType="numeric"
        placeholder="age"
        placeholderTextColor="gray"
      />
      <View style={{gap: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => createPerson(name, age)}>
          <Text style={styles.appButtonText}>create</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.btn} onPress={() => getAllPeople()}>
          <Text style={styles.appButtonText}>read</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => updatePerson(id, name, age)}>
          <Text style={styles.appButtonText}>update</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.btn} onPress={() => deletePerson(id)}>
          <Text style={styles.appButtonText}>delete</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btn} onPress={() => deleteAll()}>
          <Text style={styles.appButtonText}>delete All</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'black'}}>Bảng dữ liệu</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            width: '100%',
            display: 'flex',
            borderBottomWidth: 1,
            justifyContent: 'space-around',
          }}>
          <Text style={{fontSize: 20, color: 'black', width: 100}}>Name</Text>
          <Text style={{fontSize: 20, color: 'black', width: 100}}>Tuoi</Text>
          <Text style={{fontSize: 20, color: 'black', width: 100}}>Action</Text>
        </View>

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
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 20, color: 'black', width: 100}}>
                {laa.name}
              </Text>
              <Text style={{fontSize: 20, color: 'black', width: 100}}>
                {laa.age}
              </Text>
              <TouchableOpacity
                style={{width: 100}}
                onPress={() => deletePerson(laa.id)}>
                <Text style={{fontSize: 20, color: 'black'}}>Xóa</Text>
              </TouchableOpacity>
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
    color: 'black',
  },
  btn: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flex: 1,
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
