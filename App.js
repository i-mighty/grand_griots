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
import MailSent from './app/views/MailSent';
import EditProfile from './app/views/EditProfile';
import Categories from './app/views/Categories';
import NewRelease from './app/views/NewRelease';
import Help from './app/views/Help';
import Setting from './app/views/Setting';
import Suggest from './app/views/Suggest';
import Category from './app/views/Category';
import { Root } from 'native-base';
import Payment from './app/views/Payment';
import Intro from './app/views/Intro';

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

const CategoriesNav = createStackNavigator({
  Home: {
    screen: Categories
  }, 
  Category:{
    screen: Category
  },
  Book: {
    screen : Book
  },
}, {
  headerMode: 'none'
})

const NewReleases = createStackNavigator({
  Home: {
    screen: NewRelease
  },
  Book: {
    screen: Book
  },
}, {
  headerMode: 'none'
})

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

const AuthStack=createStackNavigator({
  Home: {
    screen: Auth
  },
  MailSent: {
    screen: MailSent
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
  Auth: {
    screen: AuthStack
  },
  Categories:{
    screen: CategoriesNav
  },
  NewReleases: {
    screen: NewReleases
  },
  Help:{
    screen: Help
  },
  Suggest:{
    screen: Suggest
  },
  Settings:{
    screen: Setting
  },
  Payment:{
    screen: Payment
  },
  Intro: {
    screen: Intro
  }
},{
  initialRouteName: 'Intro',
  contentComponent: (props) => <SideMenu {...props}/>,
  drawerWidth: widthPercentageToDP('100%')
})

const AppContainer = createAppContainer(AppNav)

export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <MagicMove.Provider>
          <AppContainer/>
        </MagicMove.Provider>
      </Root>
    );
  }
}
