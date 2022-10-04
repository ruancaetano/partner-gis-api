export class CoverageArea {
  private _type: string;
  private _coordinates: number[][][][];

  constructor(coordinates: number[][][][]) {
    this._type = "MultiPolygon";
    this._coordinates = coordinates;
  }

  get type(): string {
    return this._type;
  }

  get coordinates(): number[][][][] {
    return this._coordinates;
  }

  private validate() {
    if (!this._coordinates.length) {
      throw new Error("Coordinates cannot be empty");
    }
  }
}
