FROM node:12-slim

WORKDIR /src
COPY . /src

RUN rm -rf .env && cp .env.docker .env
RUN npm install
RUN npm i -g sequelize-cli-typescript
RUN npm run build

RUN npm install -g n

RUN n 8.10.0 

ENV HOST 0.0.0.0