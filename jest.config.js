module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-navigation|react-navigation-tabs|react-navigation-stack|native-base|@shoutem|tipsi-stripe|redux-persist|@react-native-community|@react-native)',
  ],
};
