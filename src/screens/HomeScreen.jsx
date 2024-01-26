import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useAuth} from '../context/AuthProvider';

const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const [load, setLoad] = useState(false);
  const axiosInstance = useAxiosPrivate();
  
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/test');
        if (res.status === 200) {
          setMessage(res.data.message);
        }
      } catch (e) {
        if (e.response) {
          setMessage(e.response.data.message);
        }
      }
    };
    fetchData();
    return () => abortController.abort('Data fetching cancelled');
  }, [load,axiosInstance]);

  const {logout} = useAuth();
  return (
    <View style={{paddingHorizontal: 15}}>
      <Text>{message}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLoad(!load)}>
        <Text>Load</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
