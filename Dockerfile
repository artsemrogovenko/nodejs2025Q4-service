FROM node:24-alpine3.23
WORKDIR /usr/app
COPY package*.json .
RUN npm audit
RUN npm install
COPY . .
CMD ["npm", "run", "migration:dev"]
