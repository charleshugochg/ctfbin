FROM node:15

WORKDIR /app

COPY app/package*.json ./

RUN npm install

RUN useradd -m app
USER app
