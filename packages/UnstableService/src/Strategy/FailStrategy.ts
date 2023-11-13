import { Strategy } from "./Strategy";
import { Reservation } from "../Model/Reservation";

export class FailStrategy implements Strategy {
  name: string;

  constructor(_name: string) {
    this.name = _name;
  }

  createBooking(reservation: Reservation): string {
    console.info(
      "UnstableService WARN ",
      "fail strategy is on, about to create error",
      {
        ...reservation,
      },
    );
    throw new Error("Booking can't be created at this moment");
  }
}
