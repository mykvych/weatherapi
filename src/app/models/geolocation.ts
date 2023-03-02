import { BaseGeolocation } from "./basegeolocation";

export class Geolocation implements BaseGeolocation {
  public country: string;
  public lat: number;
  public lon: number;
  public name: string;
  public state: string;

  constructor(baseGeolocation: BaseGeolocation) {
    this.country = baseGeolocation.country;
  }
}