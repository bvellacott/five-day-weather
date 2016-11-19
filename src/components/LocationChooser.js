import React, { Component } from 'react';
import './LocationChooser.css';

var results = ['London', 'Dublin', 'Edinburgh', 'Manchester', 'Liverpool', 'Glasgow', 'Newcastle'];

function Title(props) {
  return <h1 className={props.searching} onClick={props.setSearching} >{props.location}</h1>;
}

class Result extends Component {
	constructor(props) {
		super(props);
    this.setLocation = this.setLocation.bind(this);
	}

	setLocation(e) {
		this.props.setLocation(e.target.textContent);
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
    	location: props.defaultChoice,
    	searching: false
    };

    this.setLocation = this.setLocation.bind(this);
    this.setSearching = this.setSearching.bind(this);
  }

  setLocation(newLoc) {
  	this.setState({ location: newLoc, searching: false })
  }

  setSearching() {
  	this.setState({ searching: true })
  }

  render() {
    return (
    	<div className="LocationChooser">
    		<Title location={this.state.location} searching={this.state.searching} setSearching={this.setSearching}/>
				{
					this.state.searching ? 
					<ul>
						{results.map( r => <li key={r}><Result value={r} setLocation={this.setLocation} /></li> )}
					</ul>
					: null
				}
      </div>
    );
  }
}

export default LocationChooser;
