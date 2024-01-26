import React from 'react';
import {AuthProvider} from './src/context/AuthProvider';
import AppNav from './src/navigation/AppNav';


const App = () => {
  return (
    <AuthProvider> 
      <AppNav />
    </AuthProvider>
  );
};
export default App;
