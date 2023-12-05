import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { setUser, addVocabulary, deleteVocabulary, updateVocabulary } from '../redux/actions';
import store from '../redux/stores';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const URL_API = 'https://6565a266eb8bb4b70ef1fd76.mockapi.io/user';

export default function Screen2({ navigation, route }) {
  const [userLocal, setUserLocal] = useState({});
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');

  // Use local state for data
  const [data, setData] = useState([]);
  const [selectedVocabulary, setSelectedVocabulary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      store.dispatch(setUser(route.params.user));
      setUserLocal(route.params.user);
    };

    fetchData();
  }, [route.params.user]);

  // useEffect to update local state when Redux state changes
  useEffect(() => {
    const englishState = store.getState().english;
    const vietnameseState = store.getState().vietnamese;

    const newData = englishState.map((item, index) => ({
      id: index.toString(),
      content: item,
      translation: vietnameseState[index],
    }));

    setData(newData);
  }, [store.getState().english, store.getState().vietnamese]);

  const handleAddVocabulary = () => {
    store.dispatch(addVocabulary(english, vietnamese));
    setEnglish('');
    setVietnamese('');
  };

  const handleDeleteVocabulary = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    store.dispatch(deleteVocabulary(id));
  };

  const handleUpdateVocabulary = () => {
    if (selectedVocabulary) {
      console.log('Current Redux State before update:', store.getState());
      // Update Redux state
      store.dispatch(
        updateVocabulary(selectedVocabulary.id, english, vietnamese)
      );
      console.log('Current Redux State after update:', store.getState());
      // Update local state
      const updatedData = data.map((item) =>
        item.id === selectedVocabulary.id
          ? { ...item, content: { content: english }, translation: { content: vietnamese } }
          : item
      );
      setData(updatedData);
      // Clear selected vocabulary after update
      setSelectedVocabulary(null);
    }
  };

  const handleUpdateUserAPI = async () => {
    try {
      const updatedUser = store.getState();
      const response = await fetch(`${URL_API}/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUserData = await response.json();
      alert('Đồng bộ dữ liệu lên API thành công');
    } catch (error) {
      alert('Đồng bộ dữ liệu lên API thất bại');
    }
  };

  const handleVocabularyPress = (item) => {
    setSelectedVocabulary(item);
    setEnglish(item.content.content);
    setVietnamese(item.translation.content);
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {userLocal.username}!</Text>
      <Text>Add Từ Điển</Text>
      <View>
        <Text>English:</Text>
        <TextInput onChangeText={(text) => setEnglish(text)} value={english} style={{ borderWidth: 1 }} />
      </View>
      <View>
        <Text>Vietnamese:</Text>
        <TextInput onChangeText={(text) => setVietnamese(text)} value={vietnamese} style={{ borderWidth: 1 }} />
      </View>
      <TouchableOpacity onPress={handleAddVocabulary} style={{ borderWidth: 1, marginTop: 10, marginBottom: 10, width: 50 }}>
        <Text>ADD</Text>
      </TouchableOpacity>

      <View>
        <Text>LIST TỪ VỰNG</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => handleVocabularyPress(item)}>
                <Text>{item.content.content}</Text>-
                <Text>{item.translation.content}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteVocabulary(item.id)}>
                <AntDesign name="delete" size={15} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdateVocabulary(item.id)}>
                <Entypo name="pencil" size={15} color="black" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View>
        <TouchableOpacity onPress={handleUpdateUserAPI} style={{ borderWidth: 1, width: 100, marginTop: 10 }}>
          <Text>Đồng bộ API</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
