import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import *  as firebase from 'firebase';
import ReqForm from './ReqForm.js';


var alertMessage = 'This item must have been borrowed';

class ItemDetail extends Component{
     constructor(props) {
        super(props);
    }

    render(){
        let ref='MainMenu';
        let status = this.props.status;

        if(status === 'available'){
            
        return(

            <View style={styles.container}>
                <View style={styles.PhotoContainer}>
                    <Text>Picture here</Text>
                </View>
                <Text style={styles.text}>{this.props.itemType}</Text>
                <Text style={styles.text}>{this.props.brand}</Text>
                <Text>model: {this.props.model}</Text>
                <Text>EquipmentID: {this.props.itemID}</Text>
                <Text>Description: {this.props.description}</Text>
                <Text>location: {this.props.location}</Text>

                <View>
                 <TouchableOpacity style={styles.button} onPress ={
          ()=>this.props.navigator.push({index:2, passProps:
            {
              itemID: this.props.itemID,brand: this.props.brand,description: this.props.description, itemType: this.props.itemType, 
              location: this.props.location, model: this.props.model, status: this.props.status
            }})
        }>
                  <Text style={styles.textAvailBut}>Request for borrow</Text>
                </TouchableOpacity>
                </View>
              </View>

        );
        }
        else{
          return(
           <View style={styles.container}>
                <View style={styles.PhotoContainer}>
                    <Text>Picture here</Text>
                </View>
                <Text style={styles.text}>{this.props.itemType}</Text>
                <Text style={styles.text}>{this.props.brand}</Text>
                <Text>model: {this.props.model}</Text>
                <Text>EquipmentID: {this.props.itemID}</Text>
                <Text>Description: {this.props.description}</Text>
                <Text>location: {this.props.location}</Text>
                <View>
                 <TouchableOpacity style={styles.Redbutton} onPress={()=>Alert.alert(
            'Unavailable!',
            alertMessage,
          )} >
                  <Text style={styles.textAvailBut}>Unavalable</Text>
                </TouchableOpacity>
                </View>
              </View>
          );
        }
      
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    marginTop: 50,
    margin:10,
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 10,
    marginBottom:10
  },
    PhotoContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 1,
    margin:1,
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 10,
    marginBottom:5,
    
  },
    text:{
    fontSize:20,
    color : 'black',
    fontWeight :'bold'
  },
  textAvail:{
    fontSize:20,
    color : 'green',
    fontWeight :'bold'
  },
    textUnavail:{
    fontSize:20,
    color : 'red',
    fontWeight :'bold'
  },
    title:{
    fontSize: 20
  },
  button:{
    marginTop:10,
    backgroundColor: '#00e600',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,

  },
   Redbutton:{
     marginTop:10,
    backgroundColor: '#ff3333',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,

  },
  textAvailBut:{
    textAlign: 'center',
    fontSize:20,
    color : 'black',
    fontWeight :'bold',
  }
});

export default ItemDetail;