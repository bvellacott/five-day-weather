import React from 'react';
import WeatherCard from './WeatherCard';

function WeatherDays(props) {
  return (
    <ul className="App">
      { props.lists.map(list => <li key={list[0].dt}><WeatherCard list={list}/></li>)}
    </ul>
  );
}

export default WeatherDays;