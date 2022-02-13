import { createClient } from 'redis';
import { hosts } from '../const/hosts';

export const cacheRedisClient = createClient({
  url: `redis://@${hosts.cacheRedisHost}`
});

cacheRedisClient.connect();

console.log(`Cache Redis on ${hosts.cacheRedisHost}`);


export const eventRedisClient = createClient({
  url: `redis://@${hosts.eventRedisHost}`
});

eventRedisClient.connect();

console.log(`Event Redis on ${hosts.eventRedisHost}`);
