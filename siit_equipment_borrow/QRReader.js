import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, Picker, Dimensions} from 'react-native';
import *  as firebase from 'firebase';
import Camera from 'react-native-camera';
class QRReader extends Component{

    constructor(props) {
        super(props);
        this.state = {
            searchby:'itemID',
            qrcodereaddata: 'null',
            };
     }

    render(){
        return (
        <View style={styles.container}>
        <Text>{this.state.qrcodereaddata}</Text>
            <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(dataread)=>{
              this.setState({qrcodereaddata:dataread.data});
              if(this.state.qrcodereaddata.indexOf('SIIT')==0){
                    this.props.callback(this.state.qrcodereaddata.slice(4,),this.state.searchby);
                    this.props.navigator.pop();
              }
          }    
            }
            barCodeTypes={['qr']}
          >
        </Camera>
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
export default QRReader;
