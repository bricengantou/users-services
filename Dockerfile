
FROM node:20 AS development

WORKDIR /app

COPY package*.json ./

# RUN yarn add glob rimraf

RUN yarn install --only=development

COPY . .

EXPOSE 5000

RUN yarn build

FROM node:20 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

EXPOSE 5000

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
