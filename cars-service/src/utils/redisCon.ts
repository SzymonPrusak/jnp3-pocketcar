import { createClient } from 'redis';

const redisUrl = '192.168.80.128:7000';

export const redisClient = createClient({
    url: `redis://@${redisUrl}`
  });

redisClient.connect();

console.log(`Redis on ${redisUrl}`);
