import { ValidationError } from "@domain/@shared/errors/validation.error";

export class Address {
  private _type: "Point";
  private _coordinates: number[];

  constructor(coordinates: number[]) {
    this._type = "Point";
    this._coordinates = coordinates;

    this.validate();
  }

  get type(): string {
    return this._type;
  }

  get coordinates(): number[] {
    return this._coordinates;
  }

  private validate() {
    if (!this._coordinates.length) {
      throw new ValidationError("Coordinates cannot be empty");
    }
  }
}
