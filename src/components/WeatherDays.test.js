import React from 'react';
import WeatherDays from './WeatherDays';
import renderer from 'react-test-renderer';

test('Location set', () => {
  const component = renderer.create(
    <WeatherDays lists={[
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
    }, {
      "dt": 1479448456,
      "weather": [{
        "description": "mist",
        "icon": "15n"
      }],
    }]
  ]}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
