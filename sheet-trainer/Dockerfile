FROM node-with-ng-cli as builder

WORKDIR /opt/ng/
COPY . .
RUN npm install && npm run build:prod

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/ng/dist/sheet-trainer /var/www/html
