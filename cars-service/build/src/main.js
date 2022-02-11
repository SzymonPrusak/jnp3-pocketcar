"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const keycloak_config_1 = require("./config/keycloak-config");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const app = (0, express_1.default)();
const keycloak = (0, keycloak_config_1.initKeycloak)();
app.use(keycloak.middleware());
app.get('/', (_, res) => {
    res.send('Server is up!');
});
app.listen(3000);
//# sourceMappingURL=main.js.map