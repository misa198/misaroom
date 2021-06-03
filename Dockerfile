FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN cd client && npm i && npm run build
RUN cp -r ./client/build ./server
RUN cd server && npm i && npm run build

EXPOSE 8080

CMD ["node", "./server/dist/main.js"]