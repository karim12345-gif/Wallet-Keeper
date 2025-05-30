import '@testing-library/jest-dom';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const crypto = require('crypto');
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length),
  },
});