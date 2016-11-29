import React, {Component} from 'react';
import {TouchableOpacity, AppRegistry, ListView, StyleSheet, Text, View, Image, TextInput, Alert, Picker} from 'react-native';
import *  as firebase from 'firebase';

class ItemDetail extends Component{
     constructor(props) {
        super(props);
        var data=[];
        //var ref = new firebase("https://equip-f825e.firebaseio.com/");
        var database = firebase.database();
        this.val = {name: '', lastname: '', studentID:'', userState:''};
        this.submitFirebase = this.submitFirebase.bind(this);
        this.onPress = this.onPress.bind(this); ``
    }
    state = {
    Bachelor: 'Bachelor',
    Master: 'Master',
    Doctoral: 'Doctoral',
    Teacher: 'Teacher',
    mode: Picker.MODE_DIALOG,
  };


    submitFirebase(){

        firebase.database().ref('borrowRequest').set({
            lastname:this.val.lastname,
            name:this.val.name,
            studentID:this.val.studentID,
            userState: Picker.Item.value,
        });

        }


    render(){
        let ref='MainMenu';

        if(this.state.status === 'Teacher'){
            return(
                <View style={styles.container}>

             <View style={styles.header}>
                <Text style={styles.text}>
                User status:
                </Text>
            </View>
                <Picker
                selectedValue={this.state.status}
                onValueChange={(stat) => this.setState({status: stat})}>
                <Picker.Item label="Bachelor" value="Bachelor" />
                <Picker.Item label="Master" value="Master" />
                <Picker.Item label="Doctoral" value="Doctoral" />
                <Picker.Item label="Teacher" value="Teacher" />
                </Picker>
            <View style={styles.header}>
                <Text style={styles.text}>
                Name:
                </Text>
            </View>
                <TextInput style={styles.textInput}
                value={this.val.name}
                onChangeText={(name) => this.setState({name})}
                ></TextInput>

            <View style={styles.header}>
                <Text style={styles.text}>
                Last Name:
                </Text>
                 </View>
            <TextInput style={styles.textInput}
                value={this.val.lastname}
                onChangeText={(lastname) => this.setState({lastname})}
            ></TextInput>

            <TouchableOpacity style={styles.button}
            onPress={this.submitFirebase}>
            <Text style={styles.textSend}>Send</Text>
             </TouchableOpacity>

      </View>

            );
        }
        else{

        return(

            <View style={styles.container}>

             <View style={styles.header}>
                <Text style={styles.text}>
                User status:
                </Text>
            </View>
                <Picker
               selectedValue={this.state.status}
                onValueChange={(stat) => this.setState({status: stat})}>

                <Picker.Item label="Bachelor" value="Bachelor" />
                <Picker.Item label="Master" value="Master" />
                <Picker.Item label="Doctoral" value="Doctoral" />
                <Picker.Item label="Teacher" value="Teacher" />
                </Picker>
            <View style={styles.header}>
                <Text style={styles.text}>
                Name:

                </Text>
            </View>
                <TextInput style={styles.textInput}
                    value={this.val.name}
                    onChangeText={(name) => this.setState({name})}
                ></TextInput>

            <View style={styles.header}>
                <Text style={styles.text}>
                Last Name:
                </Text>
            </View>
            <TextInput style={styles.textInput}
                value={this.val.lastname}
                onChangeText={(lastname) => this.setState({lastname})}

            ></TextInput>


                 <View style={styles.header}>
                <Text style={styles.text}>
                Student ID:
                </Text>
            </View>
            <TextInput style={styles.textInput}
                value={this.val.studentID}   /////rส่งไม่ไป 
                onChangeText={(studentID) => this.setState({studentID})}
                keyboardType='numeric'
            ></TextInput>

            <TouchableOpacity style={styles.button}
            onPress={this.submitFirebase}>
            <Text style={styles.textSend}>Send</Text>
             </TouchableOpacity>

      </View>

        );
      }
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
    text:{
    fontSize:15,
    color : 'black',
    fontWeight :'bold'
  },
    title:{
    fontSize: 20
  },
  button:{
    marginTop:10,
    backgroundColor: '#00e600',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
   textInput:{
    //height:60,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10
  },
    textSend:{
    textAlign: 'center',
    fontSize:20,
    color : 'black',
    fontWeight :'bold',
  }
});

export default ItemDetail;
