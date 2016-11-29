import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import *  as firebase from 'firebase';
class ItemDetail extends Component{
     constructor(props) {
        super(props);
    }


    render(){
        let ref='MainMenu';
        return(
            <View style={styles.container}>
                <Text>{this.props.brand}</Text>
                <Text>{this.props.description}</Text>
                <Text>{this.props.itemID}</Text>
             <Text>{this.props.itemType}</Text>
          <Text>{this.props.location}</Text>
          <Text>{this.props.model}</Text>
          <Text>{this.props.price}</Text>
          <Text>{this.props.purchasedYear}</Text>
          <Text>{this.props.status}</Text>
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

export default ItemDetail;