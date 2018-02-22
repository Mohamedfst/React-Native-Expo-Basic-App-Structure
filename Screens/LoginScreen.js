import React from 'react';
import { StyleSheet, Text } from 'react-native';

import * as firebase from 'firebase';




// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAIWvTBAwZ3fu8H0t-MHQaVop2WfXbtkTs",
    authDomain: "react-f-53550.firebaseapp.com",
    databaseURL: "https://react-f-53550.firebaseio.com",
    projectId: "react-f-53550",
    storageBucket: "",
 
};

firebase.initializeApp(firebaseConfig);

import {Container,Form,Input,Item,Label, Button} from 'native-base' // 2.3.9
export default class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email:'',
      password:''
    })
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user != null){
        console.log(user)
      }
    })
  }
  //connect the input to firebase
  signUpUser = (email,password) =>{

    try{
      if(this.state.password<6)
      {
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      this.props.navigation.navigate('HomeScreen');


    }
    catch(error){
      console.log(error.toString())
    }

  }

  loginUser = (email,password) =>{
    try{
       firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
       console.log(user)
       })
       this.props.navigation.navigate('HomeScreen');
     }
    catch(error){
      console.log(error.toString())

    }

  }

  async loginWithFacebook(){

    const {type,token}= await Expo.Facebook.logInWithReadPermissionsAsync
    ('1549241848528132',{permissions:['public_profile']})

    if (type == 'success'){
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      try{
      firebase.auth().signInWithCredential(credential)
      this.props.navigation.navigate('HomeScreen');

    } catch(error){
      console.log(error.toString())

    }

    }

  }
  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email)=>this.setState({email})}
            />

          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password)=>this.setState({password})}
            />

          </Item>

          <Button style={{marginTop:10}}
          full
          rounded
          success
          onPress={() =>this.loginUser(this.state.email, this.state.password)}
          >
          <Text style ={{color:'white'}}> Login </Text>
          
          </Button>
          <Button style={{marginTop:10}}
          full
          rounded
          primary
          onPress={() =>this.signUpUser(this.state.email, this.state.password)}
          >
          <Text style ={{color:'white'}}> Sign Up </Text>
          
          </Button>

          <Button style={{marginTop:10}}
          full
          rounded
          primary
          onPress={() =>this.loginWithFacebook()}
          >
          <Text style ={{color:'white'}}> Login With Facebook </Text>
          
          </Button>
        </Form>

      </Container>
        
        
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});

