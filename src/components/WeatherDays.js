import React, { Component } from 'react';
import WeatherCard from './WeatherCard';

// import friday from '../../londonFridayWeather.json';
// import saturday from '../../londonSaturdayWeather.json';


class WeatherDays extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <ul className="App">
        { this.props.lists.map(list => <li key={list[0].dt}><WeatherCard list={list}/></li>)}
      </ul>
    );
  }
}

export default WeatherDays;