import { CityLocalNames } from "./cityLocalNames"

export interface CityInfo {
    name: string,
    local_names: CityLocalNames,
    lat: number,
    lon: number,
    country: string,
    state: string
}