import 'react-native';
import React from 'react';
import App from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});
