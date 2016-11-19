import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import LocationChooser from './components/LocationChooser'
import WeatherDays from './components/WeatherDays';

import fiveDays from '../london5DayWeather.json';

import http from 'http';

const options = {
  host: 'api.openweathermap.org',
  port: 80,
  path: '/data/2.5/forecast?lat=51.50853&lon=-0.12574&APPID=ef9d9ffffeae1c3288d5a9dee220f11c'
};

http.get(options, response => {
  console.log(response);
});

var choice = 'London';

class App extends Component {
	constructor(props) {
		super(props);
		this.choiceChanged = function(e) {
			alert(e);
		};
	}

  render() {
    return (
      <ul className="App">
      	<LocationChooser defaultChoice={fiveDays.city.name}/>
        <WeatherDays list={fiveDays.list}/>
      </ul>
    );
  }
}

export default App;
