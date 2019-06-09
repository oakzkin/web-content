FROM node:10.15.3-alpine

WORKDIR /app

#copy surcecode
COPY . .

#install yarn
RUN npm install yarn -g

#install dependency
RUN yarn install

#container command
CMD [ "yarn", "start" ]