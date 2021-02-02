FROM node:lts-alpine

WORKDIR /opt/ng/
COPY . .
RUN npm install && ng build --prod


RUN ng serve
