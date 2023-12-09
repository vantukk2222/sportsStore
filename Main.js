import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation/navigation';
import { persistor, store } from './redux/store';
import App from './navigation/App';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message'; // Import Toast từ thư viện react-native-toast-message
import { toastConfig } from './components/toastCustom';

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <App />
      <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
};

export default Main;
