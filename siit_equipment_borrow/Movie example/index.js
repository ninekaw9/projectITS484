/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight,
   AppRegistry, StyleSheet, Text, View} from 'react-native';
import ListScreen from './listScreen.js';
import DetailScreen from './detailScreen.js';
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCsVLTT_5zWzeGn0f77xD97k8itJQbEOYU",
    authDomain: "siit-equipment-audit.firebaseapp.com",
    databaseURL: "https://siit-equipment-audit.firebaseio.com",
    storageBucket: "siit-equipment-audit.appspot.com",
    messagingSenderId: "178324219535"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const routes = [
  {
    title: 'Movie Explorer',
    index: 0
  }, {
    title: 'Movie Detail',
    index: 1
  }
]

class siit_equipment_borrow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="darkred"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<ListScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></ListScreen>);
                case 1: return (<DetailScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></DetailScreen>);
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
    backgroundColor: 'darkred',
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
