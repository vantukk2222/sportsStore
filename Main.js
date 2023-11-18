import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation/navigation';
import { store } from './redux/store';
import App from './navigation/App';
// {store}

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Main;
