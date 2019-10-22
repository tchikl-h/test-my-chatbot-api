FROM node:12-slim
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# NECESSARY TO LOAD NODE-SASS MODULE
RUN apt-get update -y && apt-get install build-essential python -y

# INSTALL DOCKER
RUN apt-get update
RUN apt-get install -y nano sudo
RUN sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
RUN sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian jessie stable"
RUN sudo apt-get update
RUN sudo apt-get install -y docker-ce

WORKDIR /src
COPY . /src

RUN rm -rf .env && cp .env.docker .env
RUN npm install
RUN ln -s /src/node_modules/sequelize-cli-typescript/lib/sequelize /usr/local/bin/sequelize
RUN npm run build

RUN npm install -g n

RUN n 8.10.0 
