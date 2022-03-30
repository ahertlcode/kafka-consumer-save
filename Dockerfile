FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --only=production
COPY . .
CMD ["node", "save-consumer.js"]