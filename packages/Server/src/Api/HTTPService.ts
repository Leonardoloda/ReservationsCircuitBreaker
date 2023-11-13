import axios, { AxiosInstance } from "axios";
import { Reservation } from "../Model/Reservation";
import { ReservationAPI } from "../Controller/Datasources/ReservationAPI";

export class HTTPService implements ReservationAPI {
  private readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async processReservation(reservation: Reservation) {
    await this.client.post("reservation", {
      ...reservation.toJSON(),
    });

    console.info("Server INFO", "created reservation via HTTP", reservation.id);

    return "Reservation created successfully";
  }
}
