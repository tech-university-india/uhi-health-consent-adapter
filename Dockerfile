FROM node:alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .
RUN chmod +x docker-entrypoint.sh

EXPOSE 9007
ENTRYPOINT [ "npm", "run", "start" ]
