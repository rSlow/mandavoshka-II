FROM node:17

COPY ./package.json ./package-lock.json ./

RUN npm install && mkdir /react && mv ./node_modules /react

WORKDIR /react
COPY . .

RUN npm run build

CMD ["npm", "start"]
