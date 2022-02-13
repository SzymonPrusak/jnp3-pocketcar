import express from 'express';
import mongoose from 'mongoose';
import { settingsRouter } from './routes/settingsRoutes';
import { eventRedisClient } from './utils/redisCon';
import { hosts } from './const/hosts';
import { sendMail } from './mailSender/mailSender';
import { NotificationChannelModel } from './models/settingsModel';

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
  NotificationChannelModel.findOne({userId: msg._id}, undefined, undefined, (err, result) => {
    if(err || !result) {
      console.log(err)
      return;
    }
    sendMail(result.data, "Welcome", "Welcome " + result.data + " :)")
  })
});

eventRedisClient.subscribe('car_added', (msg, ch) => {
  console.log(ch + " " + msg);
  NotificationChannelModel.findOne({userId: msg._id, name: 'email', isEnabled: true}, undefined, undefined, (err, result) => {
    if(err || !result) {
      console.log(err)
      return;
    }
    sendMail(result.data, "Car added", "Congrats, you added a car!")
  })
});