"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailStrategy = void 0;
class FailStrategy {
    constructor(_name) {
        this.name = _name;
    }
    createBooking(reservation) {
        console.info("UnstableService WARN ", "fail strategy is on, about to create error", Object.assign({}, reservation));
        throw new Error("Booking can't be created at this moment");
    }
}
exports.FailStrategy = FailStrategy;
