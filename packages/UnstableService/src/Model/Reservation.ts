export class Reservation {
  constructor(
    private _id: string,
    private _owner: string,
    private _participants: number,
  ) {
    this._date = new Date();
  }

  private _date: Date;

  get date(): Date {
    return this._date;
  }

  get id(): string {
    return this._id;
  }

  get owner(): string {
    return this._owner;
  }

  get participants(): number {
    return this._participants;
  }
}
