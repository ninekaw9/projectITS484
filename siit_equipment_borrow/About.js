import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import *  as firebase from 'firebase';
class About extends Component{

    constructor(props) {
        super(props);
     }

    render(){
        return (
        <View style={styles.container}>
          <View style={styles.textss}>
            <Text></Text>
            <Text></Text>
            <Text style={{fontSize : 15,fontWeight:'bold'}}>ITS484 Project</Text>
            <Text style={{fontSize : 15,fontWeight:'bold'}}>School Equipment Auditiing System</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={{fontSize : 15}}>Made by</Text>
            <Text style={{fontSize : 15}}>Kitti Sintuprasert 5622780039</Text>
            <Text style={{fontSize : 15}}>Pongwanit Jeaperapong 	5622781797</Text>
            <Text style={{fontSize : 15}}>Abhinaf Singh 	5622793768</Text>

          </View>
        </View>
        );
    }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    marginTop: 50,
  },
  textss:{
    padding : 15,


  },
});
export default About;
