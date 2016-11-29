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
const config = {
    apiKey: "AIzaSyCYBw1eSe5aAMOAiLb5fT6qAbImLhGZkxM",
    authDomain: "equip-f825e.firebaseapp.com",
    databaseURL: "https://equip-f825e.firebaseio.com",
    storageBucket: "equip-f825e.appspot.com",
    messagingSenderId: "215258062654"
  };
firebase.initializeApp(config);
import MainMenu from './MainMenu.js';
import ItemDetail from './ItemDetail.js';
import ReqForm from './ReqForm.js';

  const routes= [
    {
      title: 'Main Menu',
      index: 0,
    },
    {
      title: 'Item Detail',
      index: 1,
    },
    {
      title: 'Request Form',
      index: 2,
    }
  ]
export default class siit_equipment_borrow extends Component {

  constructor(props){
    super(props);
    
  }

  render() {
    return (
      <View style={styles.container}>
      <View><StatusBar
          backgroundColor="purple"
          barStyle="light-content"
        />
        </View>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<MainMenu navigator={navigator} route={routes[route.index]} {...route.passProps}></MainMenu>);
                case 1: return (<ItemDetail navigator={navigator} route={routes[route.index]} {...route.passProps}></ItemDetail>);
                case 2: return (<ReqForm navigator={navigator} route={routes[route.index]} {...route.passProps}></ReqForm>);
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
               RightButton: (route, navigator, index, navState) => { return null; },
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
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },

});


AppRegistry.registerComponent('siit_equipment_borrow', () => siit_equipment_borrow);
