FROM node:19-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

EXPOSE 80
CMD ["npx", "serve", "build"]
