FROM node:16

ENV UNSTABLE_SERVICE_URL=http://localhost:8090

ENV CIRCUIT_BREAKER_URL=amqp://localhost
ENV CIRCUIT_BREAKER_QUEUE=FailedBookings
ENV SERVER_SERVICE_PORT=8090

WORKDIR /server/

COPY package.json .
COPY build ./build/


RUN ["yarn"]

CMD ["yarn", "start"]

EXPOSE 8090