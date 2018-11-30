import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Config from './config.js'

const cookies = new Cookies();
const queryString = require('query-string');

class Rooms extends Component {

constructor(props){
  super(props);
  this.state={
      rooms: []
  }
 }

componentWillMount() {
    let queryParams = queryString.parse(window.location.search)
    let listRomms = []
    this.getRooms(queryParams, rooms => {
        console.log("fetching rooms")
        listRomms = rooms.map(room => 
            <MuiThemeProvider>
                <div class="card-item">
                    Room No : {room.no} <br/>
                    Type: {room.type} <br/>
                    <RaisedButton label="book now" primary={true} style={style} onClick={(event) => this.handleClick(event, room)}/>
                </div>
            </MuiThemeProvider>
        );
        this.setState({
            rooms: <div class="cards"> {listRomms} </div>
        })
    })   
}

render() {
    return (
        <div>
            <h1> {this.props.hotel_name} Rooms </h1>
            {this.state.rooms}
        </div>
    );
}

handleClick(event, room) {
    window.location = "/bookings?hotel_id="+room.hotel_id+"&room_id="+room.id+"&room_no="+room.no
}

getRooms(params, callback) {
    if (params.to === undefined) {
        params.to = new Date()
    }
    if (params.from === undefined) {
        params.from = new Date()
    }
    axios.get(
        Config.ApiBaseUrl+'/rooms', 
        {
            headers: {
                "hoboos-secret": cookies.get("hoboos-secret"),
                "from": params.from,
                "to": params.to,
                "hotel_id": params.hotel_id, 
                "available": true,
            }
        },
    ).then(function(response){
        callback(response.data)
    }).catch(function(error){
        console.log(error)
    })
  }
}

const style = {
    margin: 15,
}

export default Rooms;
