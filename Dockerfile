FROM node:17-bullseye

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install @vue/cli -g

COPY package.json package-lock.json jsconfig.json vue.config.js babel.config.js ./
COPY public /app/public
RUN npm install

CMD ["npm", "run", "serve"]