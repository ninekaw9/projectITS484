import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import *  as firebase from 'firebase';
var imageurl={
  
};
var tmp='';
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
      imageurlbuffer: '',
      imageurlstate:[],
    };
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
    this.itemsfirebaseRef = this.database.ref('equipData');
    this.searchandfilter = this.searchandfilter.bind(this);
    this.getallitemsfromfirebase = this.getallitemsfromfirebase.bind(this);
    this.getimageurl = this.getimageurl.bind(this);
    
  }

  getimageurl(filename){
    let imageref='equipData/'+filename+'.jpg';
    var abc;
    console.log(imageref);
    this.storageRef.child(imageref).getDownloadURL().then(function(url) {
        console.log(url);
        imageurl[filename]=url;
        tmp=url;
  });
  }

  getallitemsfromfirebase(){
      this.itemsfirebaseRef.once('value', (snapshot) => {
        console.log('case2');
        console.log(snapshot.val());
      this.setState({
        allitems: snapshot.val(),
         itemsSource: this.state.itemsSource.cloneWithRows(snapshot.val()),
      });
    })
  }

  componentDidMount(){
    this.getallitemsfromfirebase();
  }



  searchandfilter(searchkey, searchby, resetsearch){
    if(resetsearch==true){
      this.getallitemsfromfirebase();
    }
    else{
      console.log(searchkey);
    console.log(searchby);
    this.itemsfirebaseRef.orderByChild(searchby).startAt(searchkey).endAt(searchkey).once('value', (snapshot) => {
      console.log('case1');
      console.log(snapshot.val());
      if(snapshot.val()!=null){
          this.setState({
          filtereditems: snapshot.val(),
          itemsSource: this.state.itemsSource.cloneWithRows(snapshot.val()),
      });
      }
      else{
        Alert.alert('Error','Did not found what you search for.');
      }
    })
    }
    
  }

  renderListView(data){
    this.getimageurl(data.itemID);
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
          <Image
          style={{width: 100, height: 100}}
          source={{uri: imageurl[data.itemID]}}
          />
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