FROM node:12.11.0-buster

RUN mkdir -p /home/vue/node_modules

COPY vue/* /home/vue/

WORKDIR /home/vue