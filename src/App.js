import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import LocationChooser from './components/LocationChooser'
import WeatherDays from './components/WeatherDays';
import createDb from './lib/db'

import fiveDays from '../london5DayWeather.json';

var db = createDb();
db.setLocation('London');

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      location: '',
      dayLists: []
    }
    db.getDayLists().then((lists) => { 
      this.setState({ location: db.data.city.name, dayLists: lists }); 
    });

    this.setLocation = this.setLocation.bind(this);
	}

  setLocation(newLoc) {
    db.setLocation(newLoc);
    this.setState({ location: 'Please wait...', dayLists: [] })
    db.getDayLists().then(lists => {
      this.setState({ location: newLoc, dayLists: lists })
    }).catch(err => { throw new Error(err); });
  }

  render() {
    return (
      <ul className="App">
      	<LocationChooser options={db.getLocations()} location={this.state.location} setLocation={this.setLocation}/>
        <WeatherDays lists={this.state.dayLists}/>
      </ul>
    );
  }
}

export default App;
