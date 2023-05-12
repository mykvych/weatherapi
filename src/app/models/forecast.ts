import { Forecast_City } from "./forecast_city"
import { Forecast_List } from "./forecast_list"

export interface Forecast {
    cod: string,
    message: number,
    cnt: number,
    list: Forecast_List[],
    city: Forecast_City
}