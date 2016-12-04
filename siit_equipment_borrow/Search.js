import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, Picker, Dimensions, Switch} from 'react-native';
import *  as firebase from 'firebase';
class Search extends Component{

    constructor(props) {
        super(props);
        this.state = {
            searchkey: '',
            searchby:'brand',
            switchstatus: false,
            };
     }

    render(){
      if(this.state.searchby=='status'){
        var componentA=<View style={styles.switch}>
            <Switch
              onValueChange={(value) => 
                {
                  this.setState({switchstatus:value});
                }}
              value={this.state.switchstatus}
            />
            <Text style={{fontSize:20,fontWeight:'bold'}}>    Available only</Text>
            </View>;
      }
      else{
        var componentA=<View><Text style={{padding: 10,fontSize: 20, fontWeight : 'bold'}}>Search: </Text>
          <TextInput style={styles.input}
            value={this.state.searchkey}
            onChangeText={(searchkey) => this.setState({searchkey})}
            /></View>;

      }
        return (
        <View style={styles.container}>
            {componentA}
            <Picker
            selectedValue={this.state.searchby}
            onValueChange={(s) => this.setState({searchby: s})}>
            <Picker.Item label="Brand" value="brand" />
            <Picker.Item label="Description" value="description" />
            <Picker.Item label="Item ID" value="itemID" />
            <Picker.Item label="Item Type" value="itemType" />
            <Picker.Item label="Location" value="location" />
            <Picker.Item label="Model" value="model" />
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Purchased Year" value="purchasedYear" />
            <Picker.Item label="Status" value="status" />
            </Picker>


            

            <TouchableOpacity style={styles.button}
            onPress={
                ()=>{
                  if(this.state.searchby=='status'){
                      if(this.state.switchstatus==false){
                        this.props.callback('unavailable',this.state.searchby);
                      }
                      else{
                        this.props.callback('available',this.state.searchby);
                      }
                  }
                  else{
                      this.props.callback(this.state.searchkey,this.state.searchby);
                  }
                    
                    this.props.navigator.pop();
                }
             }
            >
            <Text style={styles.textAvailBut}>Perform Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={
                ()=>{
                    this.props.callback('','',true);
                    this.props.navigator.pop();
                }
             }
            >
            <Text style={styles.textAvailBut}>Reset Search</Text>
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
  switch: {
    flexDirection : 'row'
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
  },
  button:{
    marginTop:10,
    backgroundColor: '#33C7FF',
    padding: 10,
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
export default Search;
