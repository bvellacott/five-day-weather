import React, { Component } from 'react';
import moment from 'moment';
import icons from '../lib/icons.js';
import './WeatherCard.css';

function Day(props) {
  return <h2>{moment(props.date*1000).format('dddd')}</h2>;
}

function Time(props) {
  return <h3>{moment(props.date*1000).format('LT')}</h3>;
}

function Weather(props) {
  const date = props.data.dt;
  const weather = props.data.weather[0];
  return (
    <div>
      <Time date={date} />
      <img src={ icons[weather.icon]} alt={weather.description }/>
    </div>
  );
}

function WeatherList(props) {
  return (
    <ul>
      { props.list.map((data) => <li key={data.dt} className="weather"><Weather data={data}/></li> ) }
    </ul>
  );
}

class WeatherCard extends Component {
  render() {
    return (
      <div className="WeatherCard">
        <Day date={this.props.list[0].dt}/>
        <WeatherList list={this.props.list}/>
      </div>
    );
  }
}

export default WeatherCard;
