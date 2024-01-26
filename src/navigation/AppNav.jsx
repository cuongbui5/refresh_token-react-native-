import { NavigationContainer } from '@react-navigation/native';
import { React ,useEffect,useState} from 'react';
import { useAuth } from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




 const Stack = createNativeStackNavigator();
const AppNav = () => {
  const { user,saveUser } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const storedValue = await AsyncStorage.getItem("isLogged");
     
      if (storedValue == null||storedValue==='false') {
        setIsLogged(false);
      } else {
        setIsLogged(true);   
        if (user.userId==null) {
          const userId= await AsyncStorage.getItem("userId");
          const username= await AsyncStorage.getItem("username");
          const roles = await AsyncStorage.getItem("roles");
          saveUser(userId, username, roles, true);
        }
        
      }


    }
    getData();
    console.log(isLogged);

    
   
  }, [user])
  useEffect(() => {
    console.log("isLogged updated:", isLogged);
  }, [isLogged]); 
 
 

  return (
   <NavigationContainer>
      {isLogged ? <AppStack/>:<AuthStack/> }  
    </NavigationContainer>
  );
};

export default AppNav;
