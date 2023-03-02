FROM node:latest AS builder

WORKDIR /app

COPY package.json package.json

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
CMD ["nginx", "-g", "daemon off;"]
