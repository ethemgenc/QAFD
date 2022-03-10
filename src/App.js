import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { AuthProvider } from './navigation/AuthProvider'
import Routes from './navigation/Routes'
import SplashScreen from 'react-native-splash-screen';
import { LogBox } from 'react-native';


const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
