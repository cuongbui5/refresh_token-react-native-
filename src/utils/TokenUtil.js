import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokensToStorage = async (
  accessToken,
  refreshToken
) => {

  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error saving tokens to AsyncStorage:', error);
  }
};


// Để lấy access token sau này
export const getAccessTokenFromStorage = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting access token from AsyncStorage:', error);
    return null;
  }
};
export const getRefreshTokenFromStorage = async () => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (error) {
    console.error('Error getting refresh token from AsyncStorage:', error);
    return null;
  }
};

