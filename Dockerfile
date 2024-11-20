FROM node:22-alpine

WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000 3001

CMD ["npm", "run", "dev"]
