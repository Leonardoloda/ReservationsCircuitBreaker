import { Strategy } from "../Strategy/Strategy";
import { Reservation } from "../Model/Reservation";

export class BookingController {
  constructor(private _strategy: Strategy) {}

  set strategy(value: Strategy) {
    this._strategy = value;
  }

  bookConcert(reservation: Reservation): string {
    return this._strategy.createBooking(reservation);
  }
}
