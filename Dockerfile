FROM node:14.16.0
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "save-consumer.js"]