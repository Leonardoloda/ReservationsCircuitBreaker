import { ReservationAPI } from "./Datasources/ReservationAPI";
import { Reservation } from "../Model/Reservation";

export class ReservationCircuitBreaker {
  private isOpen: Boolean;

  private lastOpenedAt: number | null;

  private readonly TIMEOUT: number = 1000;

  private failure: number = 0;

  constructor(
    private mainApi: ReservationAPI,
    private alternativeApi: ReservationAPI,
  ) {
    this.isOpen = false;
    this.lastOpenedAt = null;
  }

  async processReservation(reservation: Reservation): Promise<string> {
    console.info("Server INFO", `processing reservation`, reservation.id);

    console.info("Server INFO", "Circuit Breaker state", {
      isOpen: this.isOpen,
      lastOpenedAt: this.lastOpenedAt,
    });

    if (this.isOpen) {
      console.info(
        "Server INFO",
        "CircuitBreaker is opened, using alternative API",
        reservation.id,
      );
      if (this.lastOpenedAt && Date.now() - this.lastOpenedAt < this.TIMEOUT)
        return this.alternativeApi.processReservation(reservation);
      else this.disableCircuitBreaker();
    }

    console.info(
      "Server INFO",
      "CircuitBreaker is closed, going to main API",
      reservation.id,
    );

    try {
      const mainApiResult = await this.mainApi.processReservation(reservation);

      this.failure = 0;

      console.info("Server INFO", "main api responded with", mainApiResult);

      this.disableCircuitBreaker();

      return mainApiResult;
    } catch (error) {
      console.info("Server ERROR", "main API is not working", error);
      this.enableCircuitBreaker();
      this.failure += 1;

      return this.processReservation(reservation);
    }
  }

  private enableCircuitBreaker(): void {
    console.debug("Circuit is open");
    this.isOpen = true;
    this.lastOpenedAt = Date.now();
  }

  private disableCircuitBreaker(): void {
    console.debug("CIrcuit is close");
    this.isOpen = false;
    this.lastOpenedAt = null;
  }
}
