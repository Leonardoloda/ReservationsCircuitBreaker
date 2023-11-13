import { Reservation } from "../../Model/Reservation";

export interface ReservationAPI {
  processReservation(reservation: Reservation): Promise<string>;
}
