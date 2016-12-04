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
      colorStatus :[]
    };
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
    this.itemsfirebaseRef = this.database.ref('equipData');
    this.searchandfilter = this.searchandfilter.bind(this);
    this.getallitemsfromfirebase = this.getallitemsfromfirebase.bind(this);
    this.getColorStatus = this.getColorStatus.bind(this);
    this.getImgUrl = this.getImgUrl.bind(this);

  }


  getImgUrl(filename){
    return 'http://kittist.com/img/'+filename+'.jpg';
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

  getColorStatus(aaa){
    if(aaa === 'available'){
      return styles.greend;

    }else{
      return styles.redd;
    }
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

      return(
        <TouchableOpacity
        onPress={
          ()=>this.props.navigator.push({
            index:3,
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
              imgUrl: data.imgUrl
            }})
        }
        >
        <View style={styles.row}>
          <Image
            style={{height:100, width:100}}
            source={{uri: data.imgUrl}}
          />
          <View style={{padding:10}}>
            <Text style={styles.header}>{data.itemType}</Text>
            <View style={{flexDirection : 'row'}}>
              <Text style={{fontWeight : 'bold'}}>Brand : </Text>
              <Text >{data.brand}</Text>
            </View>
            <View style={{flexDirection : 'row'}}>
              <Text style={{fontWeight : 'bold'}}>ID : </Text>
              <Text >{data.itemID}</Text>
            </View>
            <View style={{flexDirection : 'row'}}>
              <Text style={{fontWeight : 'bold'}}>Location : </Text>
              <Text >{data.location}</Text>
            </View>
            <View style={{flexDirection : 'row'}}>
              <Text style={{fontWeight : 'bold'}}>Status : </Text>
              <Text >{data.status} </Text>
              <View style={this.getColorStatus(data.status)}></View>
            </View>

          </View>
        </View>

        <View style={{height:1, backgroundColor: 'lightgray'}}></View>
        </TouchableOpacity>

      );
  }

    render(){
        return (
        <View style={styles.container}>


        <View style={styles.containerAbove}>
        <View style={{flex:1}}>
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
          <Text style={{textAlign :'center',fontWeight : 'bold'}}>
          Search and Filter
          </Text >
          </View></TouchableOpacity>
        </View>

        <View style={{width:1, backgroundColor: 'black'}}></View>

          <View style={{flex:1}}>
            <TouchableOpacity
               onPress={
            ()=>this.props.navigator.push({
              index:5,
              passProps:
              {
                callback: this.searchandfilter,
              }})
            }
            ><View style={styles.searchbutton}>
            <Text style={{textAlign :'center',fontWeight : 'bold'}}>
            Scan QR Code
            </Text>
            </View></TouchableOpacity>

          </View>
        </View>


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
    flex: 15,
    backgroundColor: '#F5FCFF',
    padding: 10,
    marginTop: 50,
    margin:10,
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 10,
    marginBottom:10
  },
  containerAbove: {
    flexDirection : 'row',
    padding : 5
  },
  searchbutton:{
    backgroundColor: 'grey',
    padding: 10

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
  },
  row:{
      justifyContent: 'flex-start',
      flexDirection : 'row',
      alignItems: 'center',
      marginBottom: 0
    },
  column:{
      justifyContent: 'flex-start',
      flexDirection : 'column',

      marginBottom: 0
    },
    header:{
      fontSize:30,
      flexWrap: 'wrap'
    },
    redd:{
    	width: 15,
    	height: 15,
      borderRadius: 7.5,
      alignItems: 'center',
    	backgroundColor: 'red'
    },
    greend:{
      width: 15,
      height: 15,
      borderRadius: 7.5,
      alignItems: 'center',
      backgroundColor: 'green'
    }
});


export default MainMenu;
