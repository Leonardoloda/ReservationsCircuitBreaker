import express, { Request, Response } from "express";
import { SuccessStrategy } from "./src/Strategy/SuccessStrategy";
import { FailStrategy } from "./src/Strategy/FailStrategy";
import { BookingController } from "./src/Controller/BookingController";
import { Reservation } from "./src/Model/Reservation";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const successStrategy = new SuccessStrategy("Success");
const failStrategy = new FailStrategy("Fail");

const bookingController = new BookingController(successStrategy);

app.patch("/crash/:target", (req: Request, res: Response) => {
  const { target } = req.params;
  const shouldCrash = /true/.test(target);
  let message;

  if (shouldCrash) {
    bookingController.strategy = failStrategy;
    message = "App will start generating errors";
  } else {
    bookingController.strategy = successStrategy;
    message = "App will work properly";
  }

  console.info("Unstable service INFO", message);

  res.status(200).json({
    message,
  });
});

app.post("/reservation", (req: Request, res: Response) => {
  const body = req.body;

  const reservation = new Reservation(body.id, body.owner, body.participants);

  console.info("Unstable INFO", "Processsing new booking", reservation.id);

  const message = bookingController.bookConcert(reservation);

  console.info("Unstable INFO", message, reservation.id);

  res.status(201).json({
    message,
  });
});

app.listen(process.env.UNSTABLE_SERVICE_PORT, () => {
  console.info(
    "Running Unstable Service on port: ",
    process.env.UNSTABLE_SERVICE_PORT,
  );
});
