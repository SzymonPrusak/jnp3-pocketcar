import { createClient } from 'redis';
import { eventRedisHost } from '../const/hosts';

export const eventRedisClient = createClient({
    url: `redis://@${eventRedisHost}`
  });

eventRedisClient.connect();

console.log(`Event Redis on ${eventRedisHost}`);
