import { Coord } from "./coord";

export interface Forecast_City {
    id: number,
    name: string,
    coord: Coord,
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
}