FROM node:23-slim

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 4173

CMD ["npm", "run", "preview"]