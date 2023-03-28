FROM node:18 AS development

ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --save --silent --legacy-peer-deps --ignore-engines

COPY . .

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]

