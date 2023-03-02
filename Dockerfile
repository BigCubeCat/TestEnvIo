FROM node:19.7-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html

