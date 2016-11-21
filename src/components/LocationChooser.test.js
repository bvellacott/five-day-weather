import React from 'react';
import LocationChooser from './LocationChooser';
import renderer from 'react-test-renderer';

test('Location set', () => {
  const component = renderer.create(
    <LocationChooser options={['a', 'b', 'c']} location='a' setLocation={function(newLoc) { expect(newLoc).toEqual('a'); }}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[0].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[1].children[0].children[0].props.onClick({ target: {} });
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
