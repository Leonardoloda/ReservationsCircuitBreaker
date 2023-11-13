"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStrategy = void 0;
class SuccessStrategy {
    constructor(_name) {
        this.name = _name;
    }
    createBooking(reservation) {
        return "Created booking";
    }
}
exports.SuccessStrategy = SuccessStrategy;
