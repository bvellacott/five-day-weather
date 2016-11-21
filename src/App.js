import React, { Component } from 'react';
import './App.css';
import LocationChooser from './components/LocationChooser'
import WeatherDays from './components/WeatherDays';

class App extends Component {
	constructor(props) {
		super(props);
    this.db = props.db;

    this.state = {
      location: '',
      dayLists: []
    }
    this.db.getDayLists().then((lists) => { 
      this.setState({ location: this.db.data.city.name, dayLists: lists }); 
    });

    this.setLocation = this.setLocation.bind(this);
	}

  setLocation(newLoc) {
    this.db.setLocation(newLoc);
    this.setState({ location: 'Please wait...', dayLists: [] })
    this.db.getDayLists().then(lists => {
      this.setState({ location: newLoc, dayLists: lists })
    }).catch(err => { throw new Error(err); });
  }

  render() {
    return (
      <ul className="App">
      	<LocationChooser options={this.db.getLocations()} location={this.state.location} setLocation={this.setLocation}/>
        <WeatherDays lists={this.state.dayLists}/>
      </ul>
    );
  }
}

export default App;
