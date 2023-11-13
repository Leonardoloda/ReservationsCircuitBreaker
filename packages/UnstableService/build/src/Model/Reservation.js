"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
class Reservation {
    constructor(_id, _owner, _participants) {
        this._id = _id;
        this._owner = _owner;
        this._participants = _participants;
        this._date = new Date();
    }
    get date() {
        return this._date;
    }
    get id() {
        return this._id;
    }
    get owner() {
        return this._owner;
    }
    get participants() {
        return this._participants;
    }
}
exports.Reservation = Reservation;
