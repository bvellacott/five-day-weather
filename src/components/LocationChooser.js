import React, { Component } from 'react';
import './LocationChooser.css';

function Title(props) {
  return <h1 onClick={props.setSearching} >{props.location}</h1>;
}

class Result extends Component {
	constructor(props) {
		super(props);
    this.setLocation = this.setLocation.bind(this);
	}

	setLocation() {
		this.props.setLocation(this.props.value);
	}

	render() {
		return (
			<span onClick={this.setLocation}>{this.props.value}</span>
		);
	}
}

class LocationChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
   		searching: false
    };

    this.setLocation = this.setLocation.bind(this);
    this.setSearching = this.setSearching.bind(this);
  }

  setLocation(newLoc) {
  	this.props.setLocation(newLoc);
  	this.setState({ searching: false });
  }

  setSearching() {
  	this.setState({ searching: true });
  }

  render() {
    return (
    	<div className="LocationChooser">
    		<Title location={this.props.location} searching={this.state.searching} setSearching={this.setSearching}/>
				{
					this.state.searching ? 
					<ul>
						{this.props.options.map( r => <li key={r}><Result value={r} setLocation={this.setLocation} /></li> )}
					</ul>
					: null
				}
      </div>
    );
  }
}

export default LocationChooser;
