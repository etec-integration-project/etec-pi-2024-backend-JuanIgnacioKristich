FROM node:20-alpine

RUN apk update
RUN apk add bash
RUN mkdir -p /app/node_modules
RUN chmod -R 777 /usr/local

WORKDIR /app

COPY package*.json ./
RUN chmod -R 777 /app
RUN npm install
RUN npm install jsonwebtoken @types/jsonwebtoken --save
RUN npm install --save-dev @types/bcrypt



USER node

RUN npm install -g npm



COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]