FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY . .
RUN npm install 
EXPOSE 7000
CMD ["node", "index.js"]
