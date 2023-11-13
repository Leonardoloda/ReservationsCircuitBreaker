"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const HTTPService_1 = require("./src/Api/HTTPService");
const AMQService_1 = require("./src/Api/AMQService");
const Reservation_1 = require("./src/Model/Reservation");
const ReservationCircuitBreaker_1 = require("./src/Controller/ReservationCircuitBreaker");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const { UNSTABLE_SERVICE_URL, CIRCUIT_BREAKER_URL, CIRCUIT_BREAKER_QUEUE } = process.env;
if (!UNSTABLE_SERVICE_URL || !CIRCUIT_BREAKER_URL || !CIRCUIT_BREAKER_QUEUE)
    throw new Error("missing a valid config");
const httpClient = new HTTPService_1.HTTPService(UNSTABLE_SERVICE_URL);
const amqtpClient = new AMQService_1.AMQService(CIRCUIT_BREAKER_URL, CIRCUIT_BREAKER_QUEUE);
const reservationController = new ReservationCircuitBreaker_1.ReservationCircuitBreaker(httpClient, amqtpClient);
app.post("/reservation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const reservation = new Reservation_1.Reservation(body.owner, body.participants);
    const message = yield reservationController.processReservation(reservation);
    console.info("Server INFO", message, reservation.id);
    console.info("------------------------------------------");
    res.status(200).json({
        message,
    });
}));
app.listen(process.env.SERVER_SERVICE_PORT, () => {
    console.info("Server running on port", process.env.SERVER_SERVICE_PORT);
});
