import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import CheckBox from '@react-native-community/checkbox';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from '../api/axios';
import {useAuth} from '../context/AuthProvider';
import { saveTokensToStorage} from '../utils/TokenUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
  });
  const {saveUser} = useAuth();

  const [message, setMessage] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const handleEmailChange = (text) => {
    setFormLogin(prevForm => ({
      ...prevForm,
      username: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setFormLogin(prevForm => ({
      ...prevForm,
      password: text,
    }));
  };

  const login = async () => {
    if (formLogin.password === '' || formLogin.username === '') {
      setMessage('Email and password cannot be blank!');
    } else {
      setMessage('');
    }
    try {
      console.log(formLogin)
      const res = await axios.post('/auth/login', formLogin);
      if (res.status === 200) {     
        await saveTokensToStorage(res.data.accessToken, res.data.refreshToken);   
        console.log(res.data)
        const userId = res.data.userId.toString();
        const username = res.data.username;
        const roles = res.data.roles.join(',');
        
        saveUser(userId,username,roles,true);
        //navigation.navigate('Home');
      }
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data.message);
      }
    }
  };
  const imageUrl = 'http://localhost:8080/remote.php/webdav/tesst/18_da82abd272d84da1a5f148da24affa6e_master.webp';

  return (
    <SafeAreaView style={styles.container}>
      <View>
         <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.title}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Login</Text>
        <Text style={{marginTop: 20, color: 'red'}}>{message}</Text>

        <View style={styles.form}>
          <View style={styles.group}>
            <Icon name={'email'} style={styles.icon} />
            <TextInput
              placeholder={'Username'}
              placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
              style={styles.input}
              onChangeText={handleEmailChange}
            />
          </View>
          <View style={styles.group}>
            <Icon name={'locked'} style={styles.icon} />
            <TextInput
              placeholder={'Password'}
              placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
              tintColors={{true: '#1bcdff', false: '#999'}}
            />
            <Text>Remember me!</Text>
          </View>
          <TouchableOpacity>
            <Text style={{color: '#1bcdff'}}> Forgot password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#1bcdff',
            width: '95%',
            height: 35,
            borderRadius: 5,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => login()}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontWeight: '600',
              fontSize: 16,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            marginTop: 10,
          }}>
          <Text> Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#1bcdff',
              }}>
              Create account!
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 20,
          }}>
          or connect with
        </Text>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-around',
          }}>
          <View>
            <Icon name={'facebook'} color={'#1877F2'} size={25} />
          </View>
          <View>
            <Icon name={'google'} color={'#DB4437'} size={25} />
          </View>
          <View>
            <Icon name={'github'} color={'black'} size={25} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop:40,
   
  },
  title: {
    marginTop: 30,
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  group: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    borderBottomWidth: 1,
    borderColor: '#999',
    paddingLeft: 35,
  },
  icon: {
    fontSize: 25,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default LoginScreen;
