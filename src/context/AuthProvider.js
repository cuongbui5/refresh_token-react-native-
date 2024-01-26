import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveStatusLogin } from '../utils/TokenUtil';

const initialUserState = {
  userId: null,
  username: null,
  roles: [],
  isLogged:false,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  const saveUser = async (userId,username,roles, isLogged) => {
   
    
    await AsyncStorage.setItem("isLogged", "true");
    await AsyncStorage.setItem("userId", userId);
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("roles",roles );
    setUser({
      userId: userId,
      username: username,
      roles: roles,
      isLogged:isLogged
    });
  };

  const logout = async () => {
    try {
      
      await AsyncStorage.setItem('accessToken', '');
      await AsyncStorage.setItem('refreshToken', '');
      await AsyncStorage.setItem("isLogged", "false");
      await AsyncStorage.setItem("userId", "");
      await AsyncStorage.setItem("username", "");
      await AsyncStorage.setItem("roles", '');
      setUser(initialUserState);
    } catch (error) {
      console.error('Error removing tokens from AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ saveUser, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
