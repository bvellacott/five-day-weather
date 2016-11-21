import React from 'react';
import WeatherCard from './WeatherCard';
import renderer from 'react-test-renderer';

test('Display data', () => {
  const component = renderer.create(
    <WeatherCard list={
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
  }]}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
