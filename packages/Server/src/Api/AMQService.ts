import amqp, { Connection } from "amqplib";
import { Reservation } from "../Model/Reservation";
import { ReservationAPI } from "../Controller/Datasources/ReservationAPI";

export class AMQService implements ReservationAPI {
  private conn: Connection | null = null;

  constructor(
    private url: string,
    private queue: string,
  ) {}

  async createConnection() {
    this.conn = await amqp.connect(this.url);
  }

  async closeConnection() {
    if (this.conn) await this.conn.close();

    this.conn = null;
  }

  async processReservation(reservation: Reservation): Promise<string> {
    if (!this.conn) await this.createConnection();

    const channel = await this.conn!.createChannel();

    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(reservation)));

    await channel.close();

    console.info("Server: ", "Queued reservation", {
      ...reservation,
    });

    return "Service is down, reservation will be created later";
  }
}
