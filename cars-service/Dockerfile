FROM node:16.13.1-alpine3.12
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
