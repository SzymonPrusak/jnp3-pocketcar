import { createClient } from 'redis';
import { hosts } from '../const/hosts';

export const eventRedisClient = createClient({
  url: `redis://@${hosts.eventRedisHost}`
});

eventRedisClient.connect();

console.log(`Event Redis on ${hosts.eventRedisHost}`);
