import * as crypto from "crypto";

export class Reservation {
  constructor(
    private _owner: string,
    private _participants: string,
  ) {
    this._id = crypto.randomUUID();
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  get owner(): string {
    return this._owner;
  }

  get participants(): string {
    return this._participants;
  }

  toJSON(): Object {
    return {
      id: this._id,
      owner: this._owner,
      participants: this._participants,
    };
  }
}
