import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Config from './config.js'

const cookies = new Cookies();

class Hotels extends Component {
constructor(props){
    super(props);
    this.state={
        location:'',
        type: '',
        hotels: []
    }
}

componentWillMount() {
    let listHotels = []
    this.getHotels(hotels => {
        listHotels = hotels.map(hotel => 
         <MuiThemeProvider>
            <div class="card-item">
                <h2>{hotel.name} </h2>
                <h5>{hotel.type}</h5>
                <h3> Location: {hotel.location} </h3>
                <RaisedButton label="see rooms" primary={true} style={style} onClick={(event) => this.handleClick(event, hotel.id, hotel.name)}/>
            </div>
         </MuiThemeProvider>
        );
        this.setState({
            hotels: <div class="cards"> {listHotels} </div>
        })
    })   
}

render() {
    return (
        <MuiThemeProvider>
            <div>
            {this.state.hotels}
            </div>
        </MuiThemeProvider>
    );
  }

  getHotels(callback) {
    axios.get(
        Config.ApiBaseUrl+'/hotels', 
        {
            headers: {
                "hoboos-secret": cookies.get("hoboos-secret"),
                "type":this.state.type,
                "location":this.state.location
            }
        },
    ).then(response => {
        console.log(response)
        callback(response.data)
    }).catch(function(error){
        console.log(error)
    })

  }

  handleClick(event, hotelId, hotelName) {
    window.location = "/dashboard/rooms?hotel_id="+hotelId+"&hotel_name="+hotelName
  }
}

const style = {
    margin: 0,
};

export default Hotels;
