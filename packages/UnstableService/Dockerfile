FROM node:16

ENV UNSTABLE_SERVICE_PORT=8080

WORKDIR /service/

COPY package.json .

COPY build ./build/

RUN ["yarn"]

CMD ["yarn", "start"]

EXPOSE 8080