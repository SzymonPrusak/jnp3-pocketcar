import Keycloak from 'keycloak-connect';
import session from 'express-session';

let _keycloak: Keycloak.Keycloak | null;

const keycloakConfig = {
  clientId: 'cars-microservice',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080/auth',
  realm: 'LogForgeryBlocker',
  credentials: {
    secret: 'aWOWQUiCA65Nm6fQDhFKGVW4xNuTaZkv',
  },
};

export const initKeycloak = () => {
  if (_keycloak) {
    console.warn('Trying to init keycloak again');
    return _keycloak;
  } else {
    console.log('Initializing Keycloak');
    const memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
};

export const getKeycloak = () => {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please call init first.');
  }
  return _keycloak;
};
