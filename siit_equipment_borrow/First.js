import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput,Alert} from 'react-native';
import *  as firebase from 'firebase';

var alertMessage2 = 'Only for administrator!';

class First extends Component{

  constructor(props) {
  super(props);


  this.state = {
    itemcount: 0,
    bwcount: 0
  };

  this.database = firebase.database();
  this.database = firebase.database();
  this.storage = firebase.storage();
  this.storageRef = this.storage.ref();
  this.itemsfirebaseRef = this.database.ref('equipData');
  this.borrowsfirebaseRef = this.database.ref('borrowRequest');
  this.itemCount = this.itemCount.bind(this);
  this.borrowCount = this.borrowCount.bind(this);

  }



  itemCount(){
    this.itemsfirebaseRef.once('value', (snapshot) => {
    this.setState({
      itemcount: snapshot.numChildren()
    });
  })
}

borrowCount(){
  this.borrowsfirebaseRef.once('value', (snapshot) => {
  this.setState({
    bwcount: snapshot.numChildren()
  });
})
}

componentDidMount(){
  this.itemCount();
  this.borrowCount();
}


    render(){

        return (

        <View style={styles.container}>

            <View>
                <TouchableOpacity style={styles.button} onPress ={
                    ()=>this.props.navigator.push({index:1, })
                }>

                    <Text style={styles.headers}>View all items</Text>
                    <Text style={styles.rights}> {this.state.itemcount} items</Text>


                    </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>Alert.alert(
           'Unavailable!',
           alertMessage2,
         )} >

                    <Text style={styles.headers}>Borrow requests</Text>
                    <Text style={styles.rights}> {this.state.bwcount} users</Text>


                    </TouchableOpacity>
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
  button:{
    marginTop:10,
    backgroundColor: 'lightblue',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  headers:{
    fontSize:20,
    fontWeight:'bold'
  },
  rights:{
    fontSize: 40,
    textAlign : 'right'
  }
});
export default First;
