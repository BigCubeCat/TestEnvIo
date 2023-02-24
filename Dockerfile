FROM node:19-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

FROM node:19-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build
EXPOSE 80
CMD ["yarn", "start"]

