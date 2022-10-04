import { Address } from "./address";
import { CoverageArea } from "./coverage-area";

export class Partner {
  private _id: string;
  private _tradingName: string;
  private _ownerName: string;
  private _document: string;
  private _coverageArea: CoverageArea;
  private _address: Address;

  constructor(
    id: string,
    tradingName: string,
    ownerName: string,
    document: string,
    coverageArea: CoverageArea,
    address: Address
  ) {
    this._id = id;
    this._tradingName = tradingName;
    this._ownerName = ownerName;
    this._document = document;
    this._coverageArea = coverageArea;
    this._address = address;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get tradingName(): string {
    return this._tradingName;
  }

  get ownerName(): string {
    return this._ownerName;
  }

  get document(): string {
    return this._document;
  }

  get coverageArea(): CoverageArea {
    return this._coverageArea;
  }

  get address(): Address {
    return this._address;
  }

  private validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }

    if (!this._tradingName) {
      throw new Error("Trading name is required");
    }

    if (!this._ownerName) {
      throw new Error("Owner name is required");
    }

    if (!/[0-9]{13}\/[0-9]{4}/.test(this._document)) {
      throw new Error("Document is invalid");
    }

    if (!this._coverageArea) {
      throw new Error("Coverage area is required");
    }

    if (!this._address) {
      throw new Error("Address is required");
    }
  }
}
