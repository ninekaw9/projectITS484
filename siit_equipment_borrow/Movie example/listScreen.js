import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import api from './api';

class ListScreen extends Component {

  constructor(props) {
   super(props);
   this.runapi = this.runapi.bind(this);
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     dataSource: ds.cloneWithRows([]),
     searchString: 'star'
   };
   api.search(this.state.searchString).then((data)=>{
     this.setState({dataSource: ds.cloneWithRows(data)});
   });
   this.runapi = this.runapi.bind(this);
  }

  runapi(){
     const ds = this.state.dataSource;
    api.search(this.state.searchString).then((data)=>{
      if (data!='error'){
      this.setState({dataSource: ds.cloneWithRows(data)});
    }
    });
        console.log(this.state.searchString);
  }

  render() {
    return (
      <View style={ { flex:1, flexDirection: 'column'} }>
      <View style={ { flexDirection: 'row'} }>
      <TextInput style={[styles.searchbox,{flex:8}]}
      value={this.state.searchString}
      onChangeText={
        (searchString)=> this.setState({searchString})
      }
        />
        <TouchableOpacity style={[styles.button,{alignSelf: 'flex-end'}]} onPress={console.log('press')}>
          <Text style={{fontSize: 15}} onPress={()=> {
            this.runapi();}
          }>Search</Text>
          </TouchableOpacity>
      </View>
      <ListView style={styles.container}
      keyboardShouldPersistTaps={true}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) =>
            <TouchableOpacity onPress={()=> this.props.navigator.push({index: 1,
               passProps:{imdbID: rowData.imdbID}})}>
              <View style={styles.row}>
                  <View style={{flex:3}}>
                    <Image style={styles.image} source={{uri: rowData.Poster}}/>
                  </View>
                  <View style={{flex:10, padding: 10}}>
                    <Text style={styles.title}>{rowData.Title} ({rowData.Year})</Text>
                  </View>
                  <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={styles.title}>></Text>
                  </View>
              </View>
            </TouchableOpacity>
        }
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
          <View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}/>
        }
      />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    padding: 10,
    marginTop: 5,
    //paddingTop:0,
    //flex:1
  },
  row:{
    flexDirection: 'row',
    height: 100
  },
  image:{
    height: 100
  },
  title:{
    fontSize: 20
  },
  searchbox: {
    marginTop: 50,
    height:50,
    //flex: 1,
    borderWidth:0
  },
  button:{
    borderWidth: 1,
    marginTop: 50,
    margin: 10,
    padding: 10,
    backgroundColor: 'green'
  }
});

export default ListScreen;
