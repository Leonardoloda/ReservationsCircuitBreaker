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
exports.AMQService = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class AMQService {
    constructor(url, queue) {
        this.url = url;
        this.queue = queue;
        this.conn = null;
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.conn = yield amqplib_1.default.connect(this.url);
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.conn)
                yield this.conn.close();
            this.conn = null;
        });
    }
    processReservation(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.conn)
                yield this.createConnection();
            const channel = yield this.conn.createChannel();
            channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(reservation)));
            yield channel.close();
            console.info("Server: ", "Queued reservation", Object.assign({}, reservation));
            return "Service is down, reservation will be created later";
        });
    }
}
exports.AMQService = AMQService;
