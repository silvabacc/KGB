FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD [ "node", "app.tss" ]