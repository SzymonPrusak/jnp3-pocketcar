import { getKeycloak, initKeycloak } from './config/keycloak-config';

import express from 'express';

const app = express();

const keycloak = initKeycloak();
app.use(keycloak.middleware());

app.get('/', (_, res) => {
  res.send('Server is up!');
});

app.listen(3000);
