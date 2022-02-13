
export const hosts = {
    dbHost: process.env.DATABASE_HOST ?? '192.168.80.128:27017',
    dbUsername: process.env.DATABASE_USERNAME ?? 'root',
    dbPassword: process.env.DATABASE_PASSWORD ?? 'password',
  
    carsServiceHost: process.env.CARS_SERVICE_HOST,

    httpPort: process.env.HTTP_PORT ?? 3004
  }
  