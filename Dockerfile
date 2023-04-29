FROM node:19-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 9007
ENTRYPOINT [ "npm", "run", "start" ]
