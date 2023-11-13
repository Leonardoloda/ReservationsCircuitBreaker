"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
class BookingController {
    constructor(_strategy) {
        this._strategy = _strategy;
    }
    set strategy(value) {
        this._strategy = value;
    }
    bookConcert(reservation) {
        return this._strategy.createBooking(reservation);
    }
}
exports.BookingController = BookingController;
