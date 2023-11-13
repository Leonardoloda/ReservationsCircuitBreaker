import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { HTTPService } from "./src/Api/HTTPService";
import { AMQService } from "./src/Api/AMQService";
import { Reservation } from "./src/Model/Reservation";
import { ReservationCircuitBreaker } from "./src/Controller/ReservationCircuitBreaker";

const app = express();

app.use(bodyParser.json());

const { UNSTABLE_SERVICE_URL, CIRCUIT_BREAKER_URL, CIRCUIT_BREAKER_QUEUE } =
  process.env;

if (!UNSTABLE_SERVICE_URL || !CIRCUIT_BREAKER_URL || !CIRCUIT_BREAKER_QUEUE)
  throw new Error("missing a valid config");

const httpClient = new HTTPService(UNSTABLE_SERVICE_URL);
const amqtpClient = new AMQService(CIRCUIT_BREAKER_URL, CIRCUIT_BREAKER_QUEUE);

const reservationController = new ReservationCircuitBreaker(
  httpClient,
  amqtpClient,
);

app.post("/reservation", async (req: Request, res: Response) => {
  const body = req.body;

  const reservation = new Reservation(body.owner, body.participants);

  const message = await reservationController.processReservation(reservation);

  console.info("Server INFO", message, reservation.id);

  console.info("------------------------------------------");

  res.status(200).json({
    message,
  });
});

app.listen(process.env.SERVER_SERVICE_PORT, () => {
  console.info("Server running on port", process.env.SERVER_SERVICE_PORT);
});
