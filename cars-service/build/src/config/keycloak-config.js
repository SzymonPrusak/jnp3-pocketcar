"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeycloak = exports.initKeycloak = void 0;
const tslib_1 = require("tslib");
const keycloak_connect_1 = (0, tslib_1.__importDefault)(require("keycloak-connect"));
const express_session_1 = (0, tslib_1.__importDefault)(require("express-session"));
let _keycloak;
const keycloakConfig = {
    clientId: 'cars-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'LogForgeryBlocker',
    credentials: {
        secret: 'aWOWQUiCA65Nm6fQDhFKGVW4xNuTaZkv',
    },
};
const initKeycloak = () => {
    if (_keycloak) {
        console.warn('Trying to init keycloak again');
        return _keycloak;
    }
    else {
        console.log('Initializing Keycloak');
        const memoryStore = new express_session_1.default.MemoryStore();
        _keycloak = new keycloak_connect_1.default({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
};
exports.initKeycloak = initKeycloak;
const getKeycloak = () => {
    if (!_keycloak) {
        console.error('Keycloak has not been initialized. Please call init first.');
    }
    return _keycloak;
};
exports.getKeycloak = getKeycloak;
//# sourceMappingURL=keycloak-config.js.map