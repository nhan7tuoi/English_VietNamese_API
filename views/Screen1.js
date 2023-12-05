import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native';

const URL = 'https://6565a266eb8bb4b70ef1fd76.mockapi.io/user'

export default function Screen1({navigation}) {
const [data, setData] = useState([]);
useEffect(() =>{
  fetch(URL,{
      method: 'GET',
      headers: {'content-type': 'application/json'},
  }).then(res =>{
       if(res.ok){
          return res.json();
       }
  }).then(data => {
      console.log(data);
      setData(data);
  }).catch(error =>{
    console.log(error);
  })
}, []);

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
  const user = data.find((user) => user.username === username && user.password === password);
  if (user) {
      console.log('Login successful');
      navigation.navigate({
          name: 'Screen2',
          params:{
            user: user,
          }
      })
  } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
  }
};

  return (
    <View style={{ flex:1 }}>

    <TextInput
      style={{  borderWidth:1}}
      onChangeText={(text) => { setUsername(text) }}
      value={username}
      placeholder="username"
    />
<TextInput
      style={{  borderWidth:1}}
      onChangeText={(text) => { setPassword(text) }}
      value={password}
      placeholder="password"
    />
    <TouchableOpacity onPress={handleLogin} style={{borderWidth: 1, width: 100,}}>
      Login
    </TouchableOpacity>
      
</View>
  );
}
