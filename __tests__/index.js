import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});