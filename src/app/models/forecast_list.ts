import { Clouds } from "./clouds";
import { Main } from "./main";
import { Rain } from "./rain";
import { Sys } from "./sys";
import { Weather } from "./weather";
import { Wind } from "./wind";

export interface Forecast_List {
    dt: number,
    main: Main,
    weather: Weather[],
    clouds: Clouds,
    wind: Wind,
    visibility: number,
    pop: number,
    sys: Sys,
    dt_txt: string,
    rain?: Rain
}