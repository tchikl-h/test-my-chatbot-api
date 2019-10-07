FROM node:12-slim
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y && apt-get install build-essential python -y

WORKDIR /src
COPY . /src

RUN rm -rf .env && cp .env.docker .env
RUN npm install
RUN ln -s /src/node_modules/sequelize-cli-typescript/lib/sequelize /usr/local/bin/sequelize
RUN npm run build

RUN npm install -g n

RUN n 8.10.0 

ENV HOST 0.0.0.0