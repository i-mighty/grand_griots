/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Auth from './app/views/Auth';
import Home from './app/views/Home';
import ScrollSection from './app/views/ScrollSection';
import SideMenu from './app/views/SideMenu';
import Profile from './app/views/Profile';
import EditProfile from './app/views/EditProfile';
import Book from './app/views/Book';
import TrackPlayer from 'react-native-track-player';
import Library from './app/views/Library'

AppRegistry.registerComponent(appName, () =>  App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
