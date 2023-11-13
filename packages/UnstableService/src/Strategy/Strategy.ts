import {Reservation} from "../Model/Reservation";

export interface Strategy {
    name: string;
    
    createBooking(reservation: Reservation): string;
}