/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation'
import Home from './app/views/Home';
import SideMenu from './app/views/SideMenu';
import * as MagicMove from 'react-native-magic-move';
import "react-navigation-magic-move";
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Profile from './app/views/Profile';
import Book from './app/views/Book';
import Library from './app/views/Library';
import Auth from './app/views/Auth';
import EditProfile from './app/views/EditProfile';

const ProfileStack = createStackNavigator({
  Home: {
    screen: Profile,
  },
  Edit: {
    screen: EditProfile
  }
}, {
  headerMode: 'none'
});

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  }, 
  Book: {
    screen: Book
  }
}, {
  headerMode: 'none'
})

const LibraryStack = createStackNavigator({
  Home: {
    screen: Library
  }, 
  Book: {
    screen: Book
  }
}, {
  headerMode: 'none'
})

const AppNav = createDrawerNavigator({
  Explore: {
    screen: HomeStack
  },
  Profile:{
    screen: ProfileStack
  },
  Library:{
    screen: LibraryStack
  },
  Book:{
    screen: Book
  },
  Auth: {
    screen: Auth
  }
},{
  contentComponent: (props) => <SideMenu {...props}/>,
  drawerWidth: widthPercentageToDP('100%')
})

const AppContainer = createAppContainer(AppNav)

export default class App extends Component<Props> {
  render() {
    return (
      <MagicMove.Provider>
        <AppContainer/>
      </MagicMove.Provider>
    );
  }
}
