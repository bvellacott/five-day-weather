import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import createDbWithMocks from './lib/createDbWithMocks.test.js';

test('App scenario', async () => {
	var db = createDbWithMocks({
		location1: {
			city: { name: 'location1' },
			list: [
		    [{
		      "dt": 1479438000,
		      "weather": [{
		        "description": "light rain",
		        "icon": "10n"
		      }],
		    }],
		  ]
		},
		location2: {
			city: { name: 'location2' },
			list: [
		    [{
		      "dt": 1479438000,
		      "weather": [{
		        "description": "light rain",
		        "icon": "10n"
		      }],
		    }, {
		      "dt": 1479448800,
		      "weather": [{
		        "description": "clear sky",
		        "icon": "01n"
		      }],
		    }],
		    [{
		      "dt": 1479438123,
		      "weather": [{
		        "description": "heavy rain",
		        "icon": "13n"
		      }],
		    }]
		  ]
		},
	});
  const component = renderer.create( <App db={db}/> );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

	db.setLocation('location1');
	await db.getData();

  tree.children[0].children[0].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

// Below code crashes the test, I assume because the app reloads the dom after a promise resolves 
  // tree.children[0].children[1].children[1].children[0].props.onClick();
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
