FROM node:10.7

COPY . /src
WORKDIR /src

RUN npm install && npm run build

EXPOSE 3000
