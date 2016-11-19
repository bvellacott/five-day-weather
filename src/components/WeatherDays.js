import React, { Component } from 'react';
import WeatherCard from './WeatherCard';

import friday from '../../londonFridayWeather.json';
import saturday from '../../londonSaturdayWeather.json';


class WeatherDays extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <ul className="App">
        <WeatherCard list={friday.list}/>
        <WeatherCard list={saturday.list}/>
        <WeatherCard list={friday.list}/>
        <WeatherCard list={saturday.list}/>
        <WeatherCard list={friday.list}/>
      </ul>
    );
  }
}

export default WeatherDays;