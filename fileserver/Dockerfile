from node:8.6

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/
COPY keycloak.json /usr/src/
COPY ./app /usr/src/app

WORKDIR /usr/src

RUN npm install -g supervisor
RUN npm install

RUN chown -R node:node /usr/src
USER node

EXPOSE 3000

VOLUME ["/usr/src/app"]

CMD ["npm", "start"]
