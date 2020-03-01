/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App/App';
import {name as appName} from './app.json';

import './src/firebase/firebase.config';

AppRegistry.registerComponent(appName, () => App);
