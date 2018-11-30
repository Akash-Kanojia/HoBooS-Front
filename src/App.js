import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

// import logo from './logo.svg';
import './App.css';

import Login from './login'
import Register from './register'
import DashBoard from './dashboard'
import Hotels from './hotels';
import Rooms from './rooms';
import Bookings from './bookings'
import MyBookings from './my-bookings';

class App extends Component {
  // constructor(props){
  //   super(props);
  // }

  login() {
    return (
      <div className="App">
        <Login parentContext={this}/>
        {/* {this.state.uploadScreen} */}
      </div>
    );
  }

  register() {
    return (
      <div className="App">
        <Register parentContext={this}/>
        {/* {this.state.uploadScreen} */}
      </div>
    );
  }

  home() {
    return (
      <MuiThemeProvider>
          <div align="center">
          <AppBar
             title="HoBooS"
           />
          <h1> A Hotel Booking System</h1>
          <Link to="/login">Book Now</Link>
         </div>
        
         </MuiThemeProvider>
    );
  }

  dashboard() {
    return (
      <div className="App">
        <DashBoard parentContext={this}/>
      </div>
    );
  }

  hotels() {
    return (
      <div className="App">
        <Hotels parentContext={this}/>
      </div>
    );
  }

  rooms() {
    return (
      <div className="App">
        <Rooms parentContext={this}/>
      </div>
    );
  }

  bookings() {
    return (
      <div className="App">
        <Bookings parentContext={this}/>
      </div>
    );
  }

  mybookings() {
    return (
      <div className="App">
        <MyBookings parentContext={this}/>
      </div>
    );
  }

  render() {
    return (
      <Router>
      <div>      
        <Route exact path="/" component={this.home} />
        <Route path="/login" component={this.login} />
        <Route path="/register" component={this.register} />
        <Route path="/dashboard" component={this.dashboard} />
        <Route path="/dashboard/hotels" component={this.hotels} />
        <Route path="/dashboard/rooms" component={this.rooms} />
        <Route path="/bookings" component={this.bookings}/>
        <Route path="/mybookings" component={this.mybookings}/>
      </div>
    </Router>
    );
  }
}

export default App;
