FROM node:12.11.0-buster

RUN mkdir -p /home/server/node_modules

COPY app/* /home/app/

WORKDIR /home/server

RUN npm i -g @nestjs/cli

RUN npm i

CMD [ "npm", "start", "dev" ]