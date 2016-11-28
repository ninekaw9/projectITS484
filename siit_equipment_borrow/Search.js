import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, Picker, Dimensions} from 'react-native';
import *  as firebase from 'firebase';
import Camera from 'react-native-camera';
class Search extends Component{

    constructor(props) {
        super(props);
        this.state = {
            searchkey: '',
            searchby:'brand',
            };
     }

    render(){
        return (
        <View style={styles.container}>

          <Text>Search: </Text>
          <TextInput style={styles.input}
            value={this.state.searchkey}
            onChangeText={(searchkey) => this.setState({searchkey})}
            />
            <Picker
            selectedValue={this.state.searchby}
            onValueChange={(s) => this.setState({searchby: s})}>
            <Picker.Item label="Brand" value="brand" />
            <Picker.Item label="Description" value="description" />
            <Picker.Item label="Item ID" value="itemID" />
            <Picker.Item label="Item Type" value="itemType" />
            <Picker.Item label="location" value="location" />
            <Picker.Item label="model" value="model" />
            <Picker.Item label="price" value="price" />
            <Picker.Item label="purchasedYear" value="purchasedYear" />
            <Picker.Item label="status" value="status" />
            </Picker>
            <TouchableOpacity
            onPress={
                ()=>{
                    this.props.callback(this.state.searchkey,this.state.searchby);
                    this.props.navigator.pop();
                }
             }
            >
            <Text>Perform Search</Text>
            </TouchableOpacity>

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
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
export default Search;
