FROM node:16.13.0-alpine3.12
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HTTP_PORT=3000

EXPOSE 3000
CMD [ "npm", "start" ]
