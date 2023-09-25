FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json .
RUN npm ci
# Bundle app source
COPY . .
CMD [ "npm", "start" ]
