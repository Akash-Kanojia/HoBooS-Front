import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Config from './config.js'

const cookies = new Cookies();

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:'',
    isLogin: false
  }
 }

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         <div>
          Not registered yet ?  <a href="/register">Register Now</a> 
        </div>
         </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event) {
    // var self = this;
    var payload={
    "email":this.state.username,
    "password":this.state.password
    }

    axios.post(Config.ApiBaseUrl+'/login', payload, {headers: {"hoboos-secret": cookies.get("hoboos-secret")}})
    .then(response => {
      console.log("status", response.status)
      cookies.set("hoboos-secret", response.data['hoboos-secret'])   
      if (response.status === 200) {
          this.setState({isLogin:true})
         window.location = "/dashboard"
      }    
    }).catch(function (error) {
    console.log(error);
    });
  }
}

const style = {
 margin: 15,
};


export default Login;
