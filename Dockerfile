FROM node:16-alpine

WORKDIR /app

COPY yarn.lock package.json ./
RUN yarn cache clean && yarn install
COPY . .

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait ./wait
RUN chmod +x ./wait

EXPOSE 3000

CMD ["yarn", "start"]

