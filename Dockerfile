FROM node:17-bullseye

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install @vue/cli -g

COPY --chown=node:node package.json package-lock.json jsconfig.json vue.config.js babel.config.js ./
COPY --chown=node:node public /app/public
USER node
RUN npm install

CMD ["npm", "run", "serve"]