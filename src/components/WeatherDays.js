import React from 'react';
import WeatherCard from './WeatherCard';

function WeatherDays() {
  return (
    <ul className="App">
      { this.props.lists.map(list => <li key={list[0].dt}><WeatherCard list={list}/></li>)}
    </ul>
  );
}

export default WeatherDays;