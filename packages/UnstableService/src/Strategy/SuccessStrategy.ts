import { Strategy } from "./Strategy";
import { Reservation } from "../Model/Reservation";

export class SuccessStrategy implements Strategy {
  name: string;

  constructor(_name: string) {
    this.name = _name;
  }

  createBooking(reservation: Reservation): string {
    return "Created booking";
  }
}
