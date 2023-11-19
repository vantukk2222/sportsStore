/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Login } from './screens';
import {name as appName} from './app.json';
import Main from './Main';
// import Main from './Main';
// {Main}
// import App from './navigation/App';
// {MAIN}
// import App from './App';
// {App}

AppRegistry.registerComponent(appName, () => Main);
