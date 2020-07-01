FROM node:12.11.0-buster

RUN mkdir -p /home/front/node_modules

COPY front/* /home/front/

WORKDIR /home/front

RUN npm i

CMD [ "npm", "run", "dev" ]