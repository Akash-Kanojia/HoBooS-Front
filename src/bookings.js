import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Config from './config.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();
const queryString = require('query-string');

class Bookings extends Component {
constructor(props){
    super(props);
    this.state={
        from: new Date(),
        to: new Date(),
        hotel_name: '',
        room_no: '',
        room_id: '',
        hotel_id: '',
        no_of_people: '',
    }
}

componentWillMount() {
    let queryParams = queryString.parse(window.location.search)
    this.setState({
        room_no: queryParams.room_no,
        hotel_id: queryParams.hotel_id,
        room_id: queryParams.room_id
    })
    
    this.getHotel(queryParams, hotel => {
        this.setState({
            hotel_name: hotel.name+", "+hotel.location
        })
    })   
}

render() {
    return (
        <MuiThemeProvider>
        <div>
            <AppBar
                title="Bookings"
            />
            <h3>You are booking</h3>
            <h2>Room {this.state.room_no}</h2>

            <h2>Hotel: {this.state.hotel_name}</h2>
            
            <DatePicker
                selected={this.state.from}
                onSelect={(date) => this.setState({from: date})} //when day is clicked
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
            /> 
            <DatePicker
                selected={this.state.to}
                onSelect={(date) => this.setState({to: date})} //when day is clicked
                placeholderText="End Date"
                dateFormat="dd/MM/yyyy"
            />
            <br/>
            <TextField
             hintText="Enter no of people"
             floatingLabelText="No of people"
             onChange = {(event,newValue) => this.setState({no_of_people:newValue})}
             />
            <br/><br/>
            <RaisedButton label="book now" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            <br/><br/>
            <a href="/mybookings"> booking history </a>
        </div>
        </MuiThemeProvider>
    );
  }

  getHotel(params, callback) {
    axios.get(
        Config.ApiBaseUrl+'/hotels', 
        {
            headers: {
                "hoboos-secret": cookies.get("hoboos-secret"),
                "id": params.hotel_id
            }
        },
    ).then(response => {
        callback(response.data[0])
    }).catch(function(error){
        console.log(error)
    })
  }

  handleClick(event) {
    let payload = {
        from: this.state.from,
        to: this.state.to,
        no_of_people: this.state.no_of_people,
    }
    axios.post(
        Config.ApiBaseUrl+'/bookings', 
        payload,
        {
            headers: {
                "hoboos-secret": cookies.get("hoboos-secret"),
                "hotel_id":this.state.hotel_id,
                "room_id":this.state.room_id
            }
        },
    ).then(function (response) {
     if(response.status === 200){
       console.log("booking successfull");
       window.location = "/mybookings"
     }
   }).catch(function (error) {
     console.log(error);
   });
  }
}

const style = {
    margin: 0,
};

export default Bookings;
