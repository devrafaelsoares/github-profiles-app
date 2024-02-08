FROM node:20.11.0-alpine

WORKDIR /app/github-profiles-app

COPY package*.json .

RUN npm i

COPY . .

ENTRYPOINT [ "npm", "run", "dev" ]