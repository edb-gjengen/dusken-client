jest.doMock('tipsi-stripe', () => ({
  init: jest.fn(),
}));
jest.doMock('react-dom/server', () => {}, {virtual: true})

global.fetch = require('jest-fetch-mock');
