
FROM node:20 AS development

WORKDIR /app

COPY package*.json ./

# RUN yarn add glob rimraf

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:20 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]