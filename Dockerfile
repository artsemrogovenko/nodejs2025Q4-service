FROM node:24-alpine3.23
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm","run","start:dev"]