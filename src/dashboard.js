import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import Rooms from './rooms';

class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state={
        from: new Date(),
        to: new Date(),
    }
  }

  render() {
    return (
      <div className="dashboard">
        <div>
          <MuiThemeProvider>
            <AppBar
                title="Dashboard"
            />
            <div>
                <br/>
                <RaisedButton label="All hotels" style={style} primary={true} onClick={(event) => window.location="/dashboard/hotels"}/>
                <RaisedButton label="All rooms" style={style} primary={true} onClick={(event) => window.location="/dashboard/rooms"} />
                <br/>
                <div>
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
                <RaisedButton label="Search Rooms" primary={true} style={style} onClick={(event) => this.handleSearchClick(event)}/>
                </div>
           </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }

  handleSearchClick(event) {
      window.location = "/dashboard/rooms?from="+this.state.from+"&to="+this.state.to
  }
}

const style = {
    margin: 15,
}

export default DashBoard;

