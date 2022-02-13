import express from 'express';
import mongoose from 'mongoose';
import { settingsRouter } from './routes/settingsRoutes';
import { eventRedisClient } from './utils/redisCon';
import { hosts } from './const/hosts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${hosts.dbUsername}:${hosts.dbPassword}@${hosts.dbHost}`);
const db = mongoose.connection;

if (!db) {
  console.error('Error connecting to db');
} else {
  console.log('Db connected successfully');
}

app.use('/notificationSettings', settingsRouter);

app.get('/', (_, res) => {
  res.send('Server is up!');
});

app.listen(hosts.httpPort);

eventRedisClient.subscribe('registration', (msg, ch) => {
  console.log(ch + " " + msg);
  // user zarejestrowany
  // w msg._id id usera
  // maila pobierasz przez NotificationChannelModel (filtruj po userId ,name: 'email' i isEnabled: true -> adres email masz w data)
});

eventRedisClient.subscribe('car_added', (msg, ch) => {
  console.log(ch + " " + msg);
  // dodano samochód
  // w msg.userId jest id usera który dodał auto
  // maila pobierasz przez NotificationChannelModel (filtruj po userId ,name: 'email' i isEnabled: true -> adres email masz w data)
  // info o aucie w msg.car
});
