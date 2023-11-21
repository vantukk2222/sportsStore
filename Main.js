import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation/navigation';
import { persistor, store } from './redux/store';
import App from './navigation/App';
import { PersistGate } from 'redux-persist/integration/react';
import { Text, View} from 'react-native';
// {store}
// import Toast from 'react-native-toast-message';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { toastConfig } from './assets/components/toastCustom';
// {toastConfig}
const Main = () => {
  // App.jsx

/*
  1. Create the config
*/
  return (
    <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <App />
      <Toast config={toastConfig} />
{/* <Toast/> */}
    </PersistGate>
    </Provider>
  );
};

export default Main;
