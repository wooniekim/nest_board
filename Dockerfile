FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

ADD package.json /usr/src/app/package.json
RUN npm install --only=production

ADD . /usr/src/app

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]