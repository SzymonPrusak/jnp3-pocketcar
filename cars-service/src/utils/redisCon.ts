import { createClient } from 'redis';
import { cacheRedisHost, eventRedisHost } from '../const/hosts';

export const cacheRedisClient = createClient({
    url: `redis://@${cacheRedisHost}`
  });

cacheRedisClient.connect();

console.log(`Cache Redis on ${cacheRedisHost}`);


export const eventRedisClient = createClient({
    url: `redis://@${eventRedisHost}`
  });

  eventRedisClient.connect();

console.log(`Event Redis on ${eventRedisHost}`);
