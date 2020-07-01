FROM node:12.11.0-buster

RUN mkdir -p /home/api/node_modules

COPY api/* /home/api/
COPY api/.env.example /home/api/.env

WORKDIR /home/api

RUN npm i -g @nestjs/cli

RUN npm i

CMD [ "npm", "run", "dev" ]