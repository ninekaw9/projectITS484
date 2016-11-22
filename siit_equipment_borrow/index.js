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
const firebaseConfig = {
    apiKey: "AIzaSyCsVLTT_5zWzeGn0f77xD97k8itJQbEOYU",
    authDomain: "siit-equipment-audit.firebaseapp.com",
    databaseURL: "https://siit-equipment-audit.firebaseio.com",
    storageBucket: "siit-equipment-audit.appspot.com",
    messagingSenderId: "178324219535"
  };
  firebase.initializeApp(firebaseConfig);
import MainMenu from './MainMenu.js';
  const routes= [
    {
      title: 'Main Menu',
      index: 0,
    },
  ]
export default class siit_equipment_borrow extends Component {

  constructor(props){
    super(props);
    
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<MainMenu navigator={navigator} route={routes[route.index]} {...route.passProps}></MainMenu>);
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
    backgroundColor: 'blue',
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
