FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf

FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 8080

CMD ["yarn", "dev"]