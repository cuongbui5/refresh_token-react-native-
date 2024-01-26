import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native';
import axios from '../api/axios';
const RegisterScreen = ({navigation}) => {
  const [formRegister, setFormRegister] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [checkPassword, setCheckPassword] = useState({
    message: '',
    status: true,
  });

 
  const handleEmailChange = (text) => {
    setFormRegister(prevForm => ({
      ...prevForm,
      email: text,
    }));
  };

  const handleUsernameChange = (text) => {
    setFormRegister(prevForm => ({
      ...prevForm,
      username: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setFormRegister(prevForm => ({
      ...prevForm,
      password: text,
    }));
  };

  const handlePasswordConfirmChange = (text) => {
    setFormRegister(prevForm => ({
      ...prevForm,
      passwordConfirm: text,
    }));
    if (text !== formRegister.password) {
      setCheckPassword({
        status: false,
        message: 'Password confirm do not match!',
      });
    } else {
      setCheckPassword({
        status: true,
        message: '',
      });
    }
  };
  const handleRegister = async () => {
    try {
      if (!checkPassword.status) {
        return;
      }
      const res = await axios.post('/auth/register', formRegister);
      if (res.status === 201) {
        ToastAndroid.show("Đăng kí thành công!", ToastAndroid.SHORT);
        navigation.navigate('Login');
      }
    } catch (e) {
      if (e.response) {
        setCheckPassword(value => ({
          ...value,
          message: e.response.data.message,
        }));
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Register</Text>

        <View style={styles.form}>
          <View style={styles.group}>
            <Icon name={'email'} style={styles.icon} />
            <TextInput
              placeholder={'Email Address'}
              placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
              style={styles.input}
              onChangeText={handleEmailChange}
            />
          </View>
          <View style={styles.group}>
            <IconAntDesign name={'user'} style={styles.icon} />
            <TextInput
              placeholder={'Username'}
              placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
              style={styles.input}
              onChangeText={handleUsernameChange}
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
          <View style={styles.group}>
            <Icon name={'locked'} style={styles.icon} />
            <TextInput
              placeholder={'Password Confirm'}
              placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={handlePasswordConfirmChange}
            />
          </View>
          <Text style={{color: 'red', marginTop: 10, marginLeft: 5}}>
            {checkPassword.message}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#1bcdff',
            width: '95%',
            height: 35,
            borderRadius: 5,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleRegister}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontWeight: '600',
              fontSize: 16,
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            marginTop: 20,
          }}>
          <Text> Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: '#1bcdff',
              }}>
              Login now!
            </Text>
          </TouchableOpacity>
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

export default RegisterScreen;
