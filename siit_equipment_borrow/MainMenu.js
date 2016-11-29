import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import *  as firebase from 'firebase';
class MainMenu extends Component{

    constructor(props) {
    super(props);
    
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html

    this.state = {
      itemsSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      count: 0,
      equalToVal: '',
      orderByChild: '',
      searchperformed: false,
      allitems:[],
      filtereditems:[],
      shouldrerender:false,
    };
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.itemsfirebaseRef = this.database.ref('equipData');
    this.searchandfilter = this.searchandfilter.bind(this);
    this.getitemsfromfirebase = this.getitemsfromfirebase.bind(this);
  }

  downloadimg(){
    storage.child('equipData/'.filename).getDownloadURL().then(function(url) {

  }).catch(function(error) {
  // Handle any errors
  });
  }

  getitemsfromfirebase(){

    if(this.state.searchperformed==true){
    this.itemsfirebaseRef.orderByChild(this.state.orderByChild).equalTo(this.state.equalToVal).on('value', (snapshot) => {
      this.setState({
        filtereditems: snapshot.val(),
         itemsSource: this.state.itemsSource.cloneWithRows(this.state.filtereditems),
      });
    })
    }
    else if(this.state.searchperformed==false){
      this.itemsfirebaseRef.on('value', (snapshot) => {
      this.setState({allitems: snapshot.val()});
      this.setState({
         itemsSource: this.state.itemsSource.cloneWithRows(this.state.allitems),
      });
    })
    }
    this.setState({shouldrerender:true});
    console.log(this.state.filtereditems);
    console.log(this.state.allitems);
    this.forceUpdate();
  }

  componentDidMount(){
    this.getitemsfromfirebase();
  }

  searchandfilter(searchkey, searchby){
    console.log(searchkey);
    console.log(searchby);
    if(searchkey!=null){
    this.setState({
      searchperformed: true,
      equalToVal: searchkey,
      orderByChild: searchby,
    });
    }
    else{
      this.setState({
      searchperformed: false,
    });
    }
    console.log(this.state.searchperformed);
    this.getitemsfromfirebase();
  }

  renderListView(data){
      return(
        <TouchableOpacity
        onPress={
          ()=>this.props.navigator.push({
            index:1, 
            passProps:
            {
              brand: data.brand,
              description: data.description,
              itemID: data.itemID,
              itemType: data.itemType,
              location: data.location,
              model: data.model,
              price: data.price,
              purchasedYear: data.purchasedYear,
              status: data.status,
            }})
        }
        >
        <View>
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
          <TouchableOpacity
             onPress={
          ()=>this.props.navigator.push({
            index:3, 
            passProps:
            {
              callback: this.searchandfilter, 
            }})
          }
          ><View style={styles.searchbutton}>
          <Text>
          Search and Filter
          </Text>
          </View></TouchableOpacity>
          <TouchableOpacity
             onPress={
          ()=>this.props.navigator.push({
            index:4, 
            passProps:
            {
              callback: this.searchandfilter, 
            }})
          }
          ><View style={styles.searchbutton}>
          <Text>
          Scan QR Code
          </Text>
          </View></TouchableOpacity>
          <ListView
            dataSource={this.state.itemsSource}
            enableEmptySections={true}
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
  },
  searchbutton:{
    backgroundColor: 'blue',
    padding: 10,
  }
});


export default MainMenu;