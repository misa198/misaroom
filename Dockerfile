FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN cd client && yarn && yarn build
RUN cp -r ./client/build ./server
RUN cd server && yarn && yarn build

EXPOSE 8080

CMD ["node", "./server/dist/main.js"]