FROM node:12 as node-with-ng-cli

RUN npm install -g @angular/cli

FROM node-with-ng-cli as builder

WORKDIR /opt/ng/
COPY . .
RUN npm install && ng build --prod


RUN ng serve
