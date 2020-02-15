FROM node:12.3

COPY . /src
WORKDIR /src

RUN yarn install --production && yarn run build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
