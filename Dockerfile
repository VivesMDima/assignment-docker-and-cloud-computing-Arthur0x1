FROM node:22-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
USER node
RUN npm i

COPY --chown=node:node . .
RUN npm run codegen
RUN npm run build

RUN chmod u+x backend/entrypoint.sh

EXPOSE 8080
ENTRYPOINT [ "backend/entrypoint.sh" ]
