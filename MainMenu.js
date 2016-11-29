import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, ActionButton} from 'react-native';
import *  as firebase from 'firebase';
class MainMenu extends Component{

    constructor(props) {
    super(props);
    
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html

    this.state = {
      itemsSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.items=[];
    this.database = firebase.database();
    this.itemsfirebaseRef = this.database.ref('equipData');
  }

  getitemsfromfirebase(){
    this.itemsfirebaseRef.on('value', (snapshot) => {
      console.log("items change:", snapshot.val());
      this.setState({items: snapshot.val()});
      console.log(this.state.items);
      this.setState({
         itemsSource: this.state.itemsSource.cloneWithRows(this.state.items),
      });
})
  }

  componentDidMount(){
    this.getitemsfromfirebase();
  }

  renderListView(data){
      return(
        <TouchableOpacity
        onPress={
          ()=>this.props.navigator.push({index:1, passProps:
            {
              itemID: data.itemID,brand: data.brand,description: data.description, itemType: data.itemType, 
              location: data.location, model: data.model, status: data.status
            }})
        }
        >
        <View >
          <Text>{data.brand}</Text>
          <Text>{data.description}</Text>
          <Text>{data.itemID}</Text>
          <Text>{data.itemType}</Text>
          <Text>{data.location}</Text>
          <Text>{data.model}</Text>
          <Text>{data.price}</Text>
          <Text>{data.purchasedYear}</Text>
          <Text>{data.status}</Text>
          <View style={{height:1, backgroundColor: 'lightgray'}}></View>
        </View>
        </TouchableOpacity>   
      );
  }

    render(){
        return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.itemsSource}
            renderRow={this.renderListView.bind(this)} />
          
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
    margin:10,
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 10,
    marginBottom:10
  },
  group:{
    marginTop:20,
    marginLeft:20,
    marginRight:20,
  },
   title:{
    fontSize: 20
  },
  button:{
    backgroundColor: 'lightblue',
    padding: 20,
    borderWidth: 1
  }
});


export default MainMenu;