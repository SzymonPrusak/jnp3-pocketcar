FROM node:16.13.0-alpine3.12
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3004
CMD [ "npm", "start" ]
