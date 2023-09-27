
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
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
        await Realm.open({ path: 'myrealm', schema: [PersonSchema] });

    // Thêm một người mới vào danh bạ
    const createPerson = async (name, age) => {
        const realm = await getRealm();
        try {
            realm.write(() => {
                const id = realm.objects('Person').length + 1;
                realm.create('Person', { id, name, age });
            });
            Alert.alert('thanh cong', 'Them thanh cong',)
            getAllPeople()
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
        console.log('done');
    };

    return (
        <View>
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
            <View style={{ gap: 10 }}>
                <Button title="create" onPress={() => createPerson(name, age)} />
                <Button title="read" onPress={() => getAllPeople()} />
                <TextInput
                    onChangeText={setId}
                    value={id}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="id"
                />
                <TextInput
                    onChangeText={setNewName}
                    value={newName}
                    style={styles.input}
                    placeholder="new name"
                />
                <TextInput
                    onChangeText={setNewAge}
                    value={newAge}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="new age"
                />
                <Button
                    title="update"
                    onPress={() => updatePerson(parseInt(id), newName, newAge)}
                />
                <TextInput
                    onChangeText={setIdD}
                    value={idD}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="id Delete"
                />
                <Button title="delete" onPress={() => deletePerson(parseInt(idD))} />
            </View>
            <View>
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
                            <Text>{laa.id}</Text>
                            <Text>{laa.name}</Text>
                            <Text>{laa.age}</Text>
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
});

export default RealmEx;
