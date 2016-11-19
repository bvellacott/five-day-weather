import React, { Component } from 'react';
import moment from 'moment';
import icons from '../lib/icons.js';
import './WeatherCard.css';

class Day extends Component {
  constructor(props) {
    super(props);
    this.m = moment(props.date*1000);
  }

  render() {
    return <h2>{this.m.format('dddd')}</h2>;
  }
}

class FromNow extends Component {
  constructor(props) {
    super(props);
    this.m = moment(props.date*1000);
  }

  render() {
    return <h3>{this.m.format('LT')}</h3>;
  }
}

function WeatherList(props) {
  return (
    <ul>
      { props.list.map((data) => <li key={data.dt} className="weather"><Weather data={data}/></li> ) }
    </ul>
  );
}

function Weather(props) {
  const date = props.data.dt;
  const weather = props.data.weather[0];
  return (
    <div>
      <FromNow date={date} />
      <img src={ icons[weather.icon]} alt={weather.description }/>
    </div>
  );
}

class WeatherCard extends Component {
  render() {
    return (
      <li className="WeatherCard">
        <Day date={this.props.list[0].dt}/>
        <WeatherList list={this.props.list}/>
      </li>
    );
  }
}

export default WeatherCard;
