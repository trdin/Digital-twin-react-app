FROM node:18.1.0

WORKDIR /usr/src/app

ENV PORT=80

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 80

RUN npm i serve -g

RUN npm run build

CMD [ "serve", "-s", "build" ]
