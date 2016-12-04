/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  Navigator,
} from 'react-native';
import *  as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCsVLTT_5zWzeGn0f77xD97k8itJQbEOYU",
    authDomain: "siit-equipment-audit.firebaseapp.com",
    databaseURL: "https://siit-equipment-audit.firebaseio.com",
    storageBucket: "siit-equipment-audit.appspot.com",
    messagingSenderId: "178324219535"
  };
firebase.initializeApp(firebaseConfig);
import MainMenu from './MainMenu.js';
import ItemDetail from './ItemDetail.js';
import About from './About.js';
import Search from './Search.js';
import QRReader from './QRReader.js';
import ReqForm from './ReqForm.js';
import First from './First.js';

  const routes= [

    {
      title: 'Main Menu',
      index: 0,
    },
    {
      title: 'Item Detail',
      index: 3,
    },
    {
      title: 'About',
      index: 2,
    },
    {
      title: 'Search and Filter',
      index: 4,
    },
    {
      title: 'Read QR Code',
      index: 5,
    },
    {
      title: 'Borrow',
      index: 6,
    },
     {
      title: 'Item List',
      index: 1,
    }
  ]
export default class siit_equipment_borrow extends Component {

  constructor(props){
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
          backgroundColor="purple"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 1: return (<MainMenu navigator={navigator} route={routes[route.index]} {...route.passProps}></MainMenu>);
                case 3: return (<ItemDetail navigator={navigator} route={routes[route.index]} {...route.passProps}></ItemDetail>);
                case 2: return (<About navigator={navigator} route={routes[route.index]} {...route.passProps}></About>);
                case 4: return (<Search navigator={navigator} route={routes[route.index]} {...route.passProps}></Search>);
                case 5: return (<QRReader navigator={navigator} route={routes[route.index]} {...route.passProps}></QRReader>);
                case 6: return (<ReqForm navigator={navigator} route={routes[route.index]} {...route.passProps}></ReqForm>);
                case 0: return (<First navigator={navigator} route={routes[route.index]} {...route.passProps}></First>);
              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
          }
          navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                   return null;
                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.pop()}>
                     <Text style={styles.navigationBarText}>Back</Text>
                   </TouchableHighlight>
                 )
               },
               RightButton: (route, navigator, index, navState) => {
                  if (route.index == 2){
                   return null;
                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.push({index:2})}>
                     <Text style={styles.navigationBarText}>About</Text>
                   </TouchableHighlight>
                 )
                },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>); },
             }}
             style={styles.navigationBar}
           />
        }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor: 'purple',
  },
  navigationBarText:{
    color: 'white',
    padding: 10,
    fontSize: 15
  },
  titleText:{
    fontSize: 20,
    paddingTop:5,
  }

});


AppRegistry.registerComponent('siit_equipment_borrow', () => siit_equipment_borrow);
