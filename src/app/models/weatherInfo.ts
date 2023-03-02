import { Location } from "./location";
import { Day } from "./day";

export interface WeatherInfo {
  location: Location
  days: Day[];
}