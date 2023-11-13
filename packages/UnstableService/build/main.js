"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SuccessStrategy_1 = require("./src/Strategy/SuccessStrategy");
const FailStrategy_1 = require("./src/Strategy/FailStrategy");
const BookingController_1 = require("./src/Controller/BookingController");
const Reservation_1 = require("./src/Model/Reservation");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const successStrategy = new SuccessStrategy_1.SuccessStrategy("Success");
const failStrategy = new FailStrategy_1.FailStrategy("Fail");
const bookingController = new BookingController_1.BookingController(successStrategy);
app.patch("/crash/:target", (req, res) => {
    const { target } = req.params;
    const shouldCrash = /true/.test(target);
    let message;
    if (shouldCrash) {
        bookingController.strategy = failStrategy;
        message = "App will start generating errors";
    }
    else {
        bookingController.strategy = successStrategy;
        message = "App will work properly";
    }
    console.info("Unstable service INFO", message);
    res.status(200).json({
        message,
    });
});
app.post("/reservation", (req, res) => {
    const body = req.body;
    const reservation = new Reservation_1.Reservation(body.id, body.owner, body.participants);
    console.info("Unstable INFO", "Processsing new booking", reservation.id);
    const message = bookingController.bookConcert(reservation);
    console.info("Unstable INFO", message, reservation.id);
    res.status(201).json({
        message,
    });
});
app.listen(process.env.UNSTABLE_SERVICE_PORT, () => {
    console.info("Running Unstable Service on port: ", process.env.UNSTABLE_SERVICE_PORT);
});
