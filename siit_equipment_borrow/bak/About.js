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
          <Text>Made by Kaw, Daeng, Abinaf</Text>
          <Text>เหนื่อยมาก เลือดตาแทบกระเด็น</Text>
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
});
export default About;
