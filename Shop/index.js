/**
 * @format
 */

import { AppRegistry } from 'react-native';
import ProductList from './screens/Product/ProductList';
import { name as appName } from './app.json';
import App from './navigation/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

AppRegistry.registerComponent(appName, () => () =>
    <Provider store={store}>
        <App />
    </Provider>
);
